import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WishList } from './models/wish-list.model';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';

@Injectable()
export class WishListService {
	constructor(
		@InjectModel(WishList) private wishListRepository: typeof WishList
	) {}

	async createWishList(dto: CreateWishListDto) {
		return await this.wishListRepository.create(dto);
	}

	async getAllWishLists() {
		return await this.wishListRepository.findAll({
			include: { all: true }
		});
	}

	async getWishListById(id: number) {
		return await this.wishListRepository.findByPk(id, {
			include: { all: true }
		});
	}

	async updateWishList(id: number, dto: UpdateWishListDto) {
		const [rowsUpdated, [updatedWishList]] =
			await this.wishListRepository.update(dto, {
				where: { id },
				returning: true
			});
		return rowsUpdated ? updatedWishList : null;
	}

	async deleteWishList(id: number) {
		const deleted = await this.wishListRepository.destroy({
			where: { id }
		});
		return deleted
			? { message: 'WishList entry deleted successfully' }
			: { message: 'WishList entry not found' };
	}
}
