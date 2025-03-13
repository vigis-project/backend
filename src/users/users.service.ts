import { Injectable } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/request/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserAddressService } from './users-address.service';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService,
		private userAddressService: UserAddressService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('USER');
		if (role) {
			await user.$set('roles', [role.id]);
			user.roles = [role];
		}
		await this.userAddressService.setDefaultAddress(user.id);
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({
			include: { all: true }
		});
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true }
		});
		return user;
	}
}
