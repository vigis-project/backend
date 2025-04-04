import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserMsg } from './models/user-msg.model';
import { CreateUserMsgDto } from './dto/create-user-msg.dto';
import { UpdateUserMsgDto } from './dto/update-user-msg.dto';

@Injectable()
export class UserMsgService {
	constructor(
		@InjectModel(UserMsg)
		private userMsgRepository: typeof UserMsg
	) {}

	async create(dto: CreateUserMsgDto) {
		return await this.userMsgRepository.create(dto);
	}

	async getAll() {
		return await this.userMsgRepository.findAll({ include: { all: true } });
	}

	async getById(id: number) {
		const userMsg = await this.userMsgRepository.findByPk(id, {
			include: { all: true }
		});
		if (!userMsg) {
			throw new NotFoundException(`UserMsg with id ${id} not found`);
		}
		return userMsg;
	}

	async update(id: number, dto: UpdateUserMsgDto) {
		const [rowsUpdated, [updatedUserMsg]] =
			await this.userMsgRepository.update(dto, {
				where: { id },
				returning: true
			});
		return rowsUpdated ? updatedUserMsg : null;
	}

	async delete(id: number) {
		const deleted = await this.userMsgRepository.destroy({
			where: { id }
		});
		return deleted
			? { message: 'UserMsg deleted successfully' }
			: { message: 'UserMsg not found' };
	}
}
