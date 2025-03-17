import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './models/status.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

@Injectable()
export class StatusService {
	constructor(@InjectModel(Status) private statusRepository: typeof Status) {}

	async create(dto: CreateStatusDto) {
		return await this.statusRepository.create(dto);
	}

	async findAll() {
		return await this.statusRepository.findAll();
	}

	async findOne(id: number) {
		return await this.statusRepository.findByPk(id);
	}

	async update(id: number, dto: UpdateStatusDto) {
		const [rowsUpdated, [updatedStatus]] =
			await this.statusRepository.update(dto, {
				where: { id },
				returning: true
			});
		return rowsUpdated ? updatedStatus : null;
	}

	async remove(id: number) {
		const deleted = await this.statusRepository.destroy({ where: { id } });
		return deleted
			? { message: 'Status deleted successfully' }
			: { message: 'Status not found' };
	}
}
