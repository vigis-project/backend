import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/request/create-user.dto';
import { RolesService } from 'src/roles/roles.service';
import { UserAddressService } from './users-address.service';
import { UserResponseDto } from './dto/response/user-response.dto';
import { UserResponseWithRolesDto } from './dto/response/user-response-with-roles.dto';
import { Role } from 'src/roles/roles.model';

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

	async getAllUsers(offset: number, limit: number) {
		const users = await this.userRepository.findAll({
			offset,
			limit
		});
		return users;
	}

	async getUserByEmail(email: string, short: boolean = false) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: short ? undefined : { all: true }
		});
		return user;
	}

	async getCurrentUser(userId: number) {
		const user = await this.userRepository.findByPk(userId, {
			include: [Role]
		});
		if (user) {
			return UserResponseWithRolesDto.fromUser(user);
		}
		throw new NotFoundException(`Пользователь с id = ${userId} не найден`);
	}
}
