import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	NotFoundException
} from '@nestjs/common';
import { UserExchangeService } from './user-exchange-list.service';
import { CreateUserExchangeDto } from './dto/create-user-exchange-list.dto';
import { UpdateUserExchangeDto } from './dto/update-user-exchange-list.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserExchangeList } from './models/user-exchange-list.model';
import { UserExchangeDtoResponse } from './dto/response/user-exchange-list.dto';

@Controller('user-exchange')
export class UserExchangeController {
	constructor(private readonly userExchangeService: UserExchangeService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createUserExchangeDto: CreateUserExchangeDto) {
		return this.userExchangeService.createUserExchange(
			createUserExchangeDto
		);
	}

	@Get()
	async findAll() {
		const userExchanges: UserExchangeList[] =
			await this.userExchangeService.getAllUserExchanges();
		return userExchanges.map(UserExchangeDtoResponse.fromUserExchange);
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		const userExchange =
			await this.userExchangeService.getUserExchangeById(id);
		if (userExchange) {
			return UserExchangeDtoResponse.fromUserExchange(userExchange);
		}
		throw new NotFoundException(`UserExchange with id = ${id} not found`);
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateUserExchangeDto: UpdateUserExchangeDto
	) {
		return this.userExchangeService.updateUserExchange(
			id,
			updateUserExchangeDto
		);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.userExchangeService.deleteUserExchange(id);
	}
}
