import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserResponseDto } from './dto/response/user-response.dto';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

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
		const users = await this.userService.getAllUsers();
		const usersDTOs: UserResponseDto[] = [];
		users.slice((page - 1) * limit, page * limit).map((u) => {
			usersDTOs.push(
				new UserResponseDto(
					u.id,
					u.email,
					u.username,
					u.firstName,
					u.lastName,
					u.secondName
				)
			);
		});
		return usersDTOs;
	}
}
