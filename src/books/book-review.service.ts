import {
	ForbiddenException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookReview } from './models/book-review.models';
import { CreateBookReviewDto } from './dto/request/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/request/update-book-review.dto';
import { BookReviewCreationAttrs } from './types/book-review-creation-attrs.interface';

@Injectable()
export class BookReviewService {
	constructor(
		@InjectModel(BookReview) private reviewRepository: typeof BookReview
	) {}

	async createReview(dto: CreateBookReviewDto, userId: number) {
		const bookReview: BookReviewCreationAttrs = { ...dto, userId: userId };
		return await this.reviewRepository.create(bookReview);
	}

	async getAllReviews() {
		return await this.reviewRepository.findAll({ include: { all: true } });
	}

	async updateReview(id: number, dto: UpdateBookReviewDto, userId: number) {
		const review = await this.reviewRepository.findByPk(id);

		if (review) {
			if (userId != review.userId) {
				throw new ForbiddenException(
					'Вы не можете изменять или удалять этот отзыв, так как он принадлежит другому пользователю'
				);
			}

			const [rowsUpdated, [updatedReview]] =
				await this.reviewRepository.update(dto, {
					where: { id },
					returning: true
				});
			return rowsUpdated ? updatedReview : null;
		}

		throw new NotFoundException(`Отзыв с id = ${id} не найден`);
	}

	async deleteReview(id: number, userId: number) {
		const review = await this.reviewRepository.findByPk(id);

		if (review) {
			if (userId != review.userId) {
				throw new ForbiddenException(
					'Вы не можете изменять или удалять этот отзыв, так как он принадлежит другому пользователю'
				);
			}

			const deleted = await this.reviewRepository.destroy({
				where: { id }
			});
			return deleted
				? { message: 'Review deleted successfully' }
				: { message: 'Review not found' };
		}

		throw new NotFoundException(`Отзыв с id = ${id} не найден`);
	}
}
