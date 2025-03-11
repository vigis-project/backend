import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateBookReviewSchema } from 'src/books/schemas/book.schema';

export class UpdateBookReviewDto
	implements z.infer<typeof UpdateBookReviewSchema>
{
	@ApiProperty({
		description: 'Отзыв',
		example: 'Развёрнутый отзыв',
		required: false
	})
	readonly review?: string;
	@ApiProperty({
		description: 'Заметка (Отзыв в 2х словах)',
		example: 'Книга огонь! Рекомендую к прочтению',
		required: false
	})
	readonly note?: string;
}
