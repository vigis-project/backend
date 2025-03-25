import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserExchangeList } from './models/user-exchange-list.model';
import { CreateUserExchangeDto } from './dto/create-user-exchange-list.dto';
import { UpdateUserExchangeDto } from './dto/update-user-exchange-list.dto';

@Injectable()
export class UserExchangeService {
	constructor(
		@InjectModel(UserExchangeList)
		private userExchangeRepository: typeof UserExchangeList
	) {}

	async createUserExchange(dto: CreateUserExchangeDto) {
		return await this.userExchangeRepository.create(dto);
	}

	async getAllUserExchanges() {
		return await this.userExchangeRepository.findAll({
			include: { all: true }
		});
	}

	async getUserExchangeById(id: number) {
		const userExchange = await this.userExchangeRepository.findByPk(id, {
			include: { all: true }
		});
		if (!userExchange)
			throw new NotFoundException(`UserExchange with id ${id} not found`);
		return userExchange;
	}

	async updateUserExchange(id: number, dto: UpdateUserExchangeDto) {
		const [rowsUpdated, [updatedUserExchange]] =
			await this.userExchangeRepository.update(dto, {
				where: { id },
				returning: true
			});
		if (!rowsUpdated)
			throw new NotFoundException(`UserExchange with id ${id} not found`);
		return updatedUserExchange;
	}

	async deleteUserExchange(id: number) {
		const deleted = await this.userExchangeRepository.destroy({
			where: { id }
		});
		if (!deleted)
			throw new NotFoundException(`UserExchange with id ${id} not found`);
		return { message: 'User Exchange deleted successfully' };
	}
}
