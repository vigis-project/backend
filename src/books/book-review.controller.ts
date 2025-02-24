import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common';
import { BookReviewService } from './book-review.service';
import { CreateBookReviewDto } from './dto/create-book-review.dto';
import { UpdateBookReviewDto } from './dto/update-book-review.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('reviews')
export class BookReviewController {
	constructor(private readonly reviewService: BookReviewService) {}

	@Post()
	createReview(@Body() createReviewDto: CreateBookReviewDto) {
		return this.reviewService.createReview(createReviewDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	findAll() {
		return this.reviewService.getAllReviews();
	}

	@Patch(':id')
	updateReview(
		@Param('id') id: string,
		@Body() updateReviewDto: UpdateBookReviewDto
	) {
		return this.reviewService.updateReview(+id, updateReviewDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.reviewService.deleteReview(+id);
	}
}
