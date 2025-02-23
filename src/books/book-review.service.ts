import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookReview } from './models/book-review.models';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';

@Injectable()
export class BookReviewService {
	constructor(
		@InjectModel(BookReview) private reviewRepository: typeof BookReview
	) {}

	async createReview(dto: CreateBookReviewDto) {
		return await this.reviewRepository.create(dto);
	}

	async getAllReviews() {
		return await this.reviewRepository.findAll({ include: { all: true } });
	}

	async getReviewsByBookId(bookId: number) {
		return await this.reviewRepository.findAll({
			where: { bookId },
			include: { all: true }
		});
	}

	async getReviewsByUserId(userId: number) {
		return await this.reviewRepository.findAll({
			where: { userId },
			include: { all: true }
		});
	}

	async updateReview(id: number, dto: UpdateBookReviewDto) {
		const [rowsUpdated, [updatedReview]] =
			await this.reviewRepository.update(dto, {
				where: { id },
				returning: true
			});
		return rowsUpdated ? updatedReview : null;
	}

	async deleteReview(id: number) {
		const deleted = await this.reviewRepository.destroy({ where: { id } });
		return deleted
			? { message: 'Review deleted successfully' }
			: { message: 'Review not found' };
	}
}
