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
import { UserListService } from './user-list.service';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserList } from './models/user-list.model';
import { UserListDtoResponse } from './dto/response/user-list.dto';

@Controller('user-list')
export class UserListController {
	constructor(private readonly userListService: UserListService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createUserListDto: CreateUserListDto) {
		return this.userListService.createUserList(createUserListDto);
	}

	@Get()
	async findAll() {
		const userLists: UserList[] =
			await this.userListService.getAllUserLists();
		return userLists.map(UserListDtoResponse.fromUserList);
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		const userList = await this.userListService.getUserListById(id);
		if (userList) {
			return UserListDtoResponse.fromUserList(userList);
		}
		throw new NotFoundException(`UserList with id = ${id} not found`);
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateUserListDto: UpdateUserListDto
	) {
		return this.userListService.updateUserList(id, updateUserListDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.userListService.deleteUserList(id);
	}
}
