import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OfferList } from './models/offer-list.model';
import { CreateOfferListDto } from './dto/create-offer-list.dto';
import { UpdateOfferListDto } from './dto/update-offer-list.dto';

@Injectable()
export class OfferListService {
	constructor(
		@InjectModel(OfferList) private offerRepository: typeof OfferList
	) {}

	async createOffer(dto: CreateOfferListDto) {
		return await this.offerRepository.create(dto);
	}

	async getAllOffers() {
		return await this.offerRepository.findAll({ include: { all: true } });
	}

	async getOfferById(id: number) {
		return await this.offerRepository.findByPk(id, {
			include: { all: true }
		});
	}

	async updateOffer(id: number, dto: UpdateOfferListDto) {
		const [rowsUpdated, [updatedOffer]] = await this.offerRepository.update(
			dto,
			{
				where: { id },
				returning: true
			}
		);
		return rowsUpdated ? updatedOffer : null;
	}

	async deleteOffer(id: number) {
		const deleted = await this.offerRepository.destroy({ where: { id } });
		return deleted
			? { message: 'Offer deleted successfully' }
			: { message: 'Offer not found' };
	}
}
