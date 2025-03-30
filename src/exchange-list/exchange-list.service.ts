import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ExchangeList } from './models/exchange-list.model';
import { CreateExchangeListDto } from './dto/create-exchange-list.dto';
import { UpdateExchangeListDto } from './dto/update-exchange-list.dto';

@Injectable()
export class ExchangeListService {
	constructor(
		@InjectModel(ExchangeList)
		private exchangeRepository: typeof ExchangeList
	) {}

	async createExchange(dto: CreateExchangeListDto) {
		return await this.exchangeRepository.create(dto);
	}

	async getAllExchanges() {
		return await this.exchangeRepository.findAll({
			include: { all: true }
		});
	}

	async getExchangeById(id: number) {
		return await this.exchangeRepository.findByPk(id, {
			include: { all: true }
		});
	}

	async updateExchange(id: number, dto: UpdateExchangeListDto) {
		const [rowsUpdated, [updatedExchange]] =
			await this.exchangeRepository.update(dto, {
				where: { id },
				returning: true
			});
		return rowsUpdated ? updatedExchange : null;
	}

	async deleteExchange(id: number) {
		const deleted = await this.exchangeRepository.destroy({
			where: { id }
		});
		return deleted
			? { message: 'Exchange deleted successfully' }
			: { message: 'Exchange not found' };
	}
}
