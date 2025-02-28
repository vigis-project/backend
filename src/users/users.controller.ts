import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.userService.createUser(userDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.userService.getAllUsers();
	}
}
