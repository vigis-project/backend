import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserList } from './models/user-list.model';
import { CreateUserListDto } from './dto/create-user-list.dto';
import { UpdateUserListDto } from './dto/update-user-list.dto';
import { List } from './models/list.model';
import { TypeList } from './models/type-list.model';

@Injectable()
export class UserListService {
	constructor(
		@InjectModel(UserList)
		private userListRepository: typeof UserList
	) {}

	async createUserList(dto: CreateUserListDto) {
		return await this.userListRepository.create(dto);
	}

	async getAllUserLists() {
		return await this.userListRepository.findAll({
			include: [TypeList, List]
		});
	}

	async getUserListById(id: number) {
		const userList = await this.userListRepository.findByPk(id, {
			include: [TypeList, List]
		});
		if (!userList)
			throw new NotFoundException(`UserList with id ${id} not found`);
		return userList;
	}

	async updateUserList(id: number, dto: UpdateUserListDto) {
		const [rowsUpdated, [updatedUserList]] =
			await this.userListRepository.update(dto, {
				where: { id },
				returning: true
			});
		if (!rowsUpdated)
			throw new NotFoundException(`UserList with id ${id} not found`);
		return updatedUserList;
	}

	async deleteUserList(id: number) {
		const deleted = await this.userListRepository.destroy({
			where: { id }
		});
		if (!deleted)
			throw new NotFoundException(`UserList with id ${id} not found`);
		return { message: 'UserList deleted successfully' };
	}
}
