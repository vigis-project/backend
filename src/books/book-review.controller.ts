import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	UnauthorizedException
} from '@nestjs/common';
import { BookReviewService } from './book-review.service';
import { CreateBookReviewDto } from './dto/request/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/request/update-book-review.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { BookReviewResponseDto } from './dto/response/book-review-response.dto';
import { User } from 'src/users/user.decorator';

@Controller('reviews')
export class BookReviewController {
	constructor(private readonly reviewService: BookReviewService) {}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Написать рецензию (отзыв) на книгу, доступно только для авторизованных пользователей'
	})
	@UseGuards(JwtAuthGuard)
	@Post()
	createReview(@Body() createReviewDto: CreateBookReviewDto, @User() user) {
		const userId = user.id;

		return this.reviewService.createReview(createReviewDto, userId);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Получить все рецензии на книги, требует JWT токен с ролью ADMIN или STAFF'
	})
	@ApiQuery({
		name: 'limit',
		type: Number,
		default: 10,
		description: 'Количество рецензий на книги, возвращаемых при запросе',
		required: false
	})
	@ApiQuery({
		name: 'page',
		type: Number,
		default: 1,
		description: 'Страница рецензий на книги, возвращаемых при запросе',
		required: false
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(
		@Query('limit') limit: number | undefined,
		@Query('page') page: number | undefined
	) {
		limit = limit ?? 10;
		page = page ?? 1;
		const reviews = await this.reviewService.getAllReviews();
		const booksReviewsDTOs: BookReviewResponseDto[] = [];

		reviews.slice((page - 1) * limit, page * limit).map((r) => {
			booksReviewsDTOs.push(
				new BookReviewResponseDto(
					r.id,
					r.review,
					r.note,
					r.bookId,
					r.userId
				)
			);
		});

		return booksReviewsDTOs;
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Обновление отзыва о книгe, пользователь должен быть авторизован'
	})
	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async updateReview(
		@Param('id') id: number,
		@Body() updateReviewDto: UpdateBookReviewDto,
		@User() user
	) {
		if (!user) {
			throw new UnauthorizedException('Пользователь не авторизован');
		}
		const userId = user.id;
		return await this.reviewService.updateReview(
			id,
			updateReviewDto,
			userId
		);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Удаление отзыва о книгe, пользователь должен быть авторизован'
	})
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	remove(@Param('id') id: number, @User() user) {
		if (!user) {
			throw new UnauthorizedException('Пользователь не авторизован');
		}

		const userId = user.id;
		return this.reviewService.deleteReview(id, userId);
	}
}
