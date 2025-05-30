import {
	Body,
	Controller,
	ForbiddenException,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiQuery
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserAddressService } from './users-address.service';
import { User } from './user.decorator';
import { UpdateUserAddressDto } from './dto/request/update-user-address.dto';
import { CustomZodValidationPipe } from 'src/pipes/custom-zod-validation-pipe.pipe';
import { UpdateUserAddressSchema } from './schemas/user-address.schema';
import { User as UserModel } from './models/users.model';
import { UserResponseFullDto } from './dto/response/user-response-full.dto';
import { AuthUserData } from 'src/auth/types';

@Controller('users')
export class UsersController {
	constructor(
		private userService: UsersService,
		private userAddressService: UserAddressService
	) {}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Создать пользователя, требует JWT токен с ролью ADMIN'
	})
	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.userService.createUser(userDto);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Получить всех пользователей, требует JWT токен с ролью ADMIN'
	})
	@ApiQuery({
		name: 'limit',
		type: Number,
		default: 10,
		description: 'Количество пользователей, возвращаемых при запросе',
		required: false
	})
	@ApiQuery({
		name: 'page',
		type: Number,
		default: 1,
		description: 'Страница пользователей, возвращаемых при запросе',
		required: false
	})
	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	async getAll(
		@Query('limit') limit: number | undefined,
		@Query('page') page: number | undefined
	) {
		limit = limit ?? 10;
		page = page ?? 1;

		const offset = (page - 1) * limit;

		const users = await this.userService.getAllUsers(offset, limit);

		const usersDTOs: UserResponseDto[] = [];

		users.map((u) => {
			usersDTOs.push(
				new UserResponseDto(
					u.id,
					u.username,
					u.firstName,
					u.lastName,
					u.secondName
				)
			);
		});
		return usersDTOs;
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Получить данные текущего пользователя, пользователь должен быть авторизован'
	})
	@UseGuards(JwtAuthGuard)
	@Get('me')
	async getCurrentUser(@User() user: AuthUserData) {
		const userId = user.id;
		const userData = await this.userService.getUserById(userId);

		if (!userData) {
			throw new ForbiddenException('Not authorized');
		}

		return UserResponseFullDto.fromUser(userData);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Получить данные пользователя, пользователь должен быть авторизован'
	})
	@UseGuards(JwtAuthGuard)
	@Get(':id')
	async getUser(@Param('id') userId: number) {
		const user = await this.userService.getUserById(userId);

		if (user) {
			return UserResponseDto.fromUser(user);
		} else {
			throw new NotFoundException({
				message: 'Пользователь с таким ID не найден.'
			});
		}
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Получить адрес пользователя, пользователь должен быть авторизован'
	})
	@UseGuards(JwtAuthGuard)
	@Get(':id/address')
	async getUserAddressByUserId(@Param('id') userId: number, @User() user) {
		const address = await this.userAddressService.findUserAddressByUserID(
			user,
			userId
		);
		if (address) {
			return address;
		}
		throw new NotFoundException(
			`Адрес пользователя с id = ${userId} не найден`
		);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Обновить адрес пользователя по ID пользователя, пользователь должен быть авторизован',
		description: 'Требуется JWT токен владелец адреса.'
	})
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'ID пользователя, чей адрес нужно обновить'
	})
	@UseGuards(JwtAuthGuard)
	@Put(':id/address')
	async updateUserAddress(
		@Param('id') userId: number,
		@Body(new CustomZodValidationPipe(UpdateUserAddressSchema))
		updateUserAddressDto: UpdateUserAddressDto,
		@User() user
	) {
		const updatedAddress =
			await this.userAddressService.updateUserAddressByUserId(
				user,
				userId,
				updateUserAddressDto
			);

		if (!updatedAddress) {
			throw new NotFoundException(
				`Адрес пользователя с ID = ${userId} не найден`
			);
		}

		return updatedAddress;
	}
}
