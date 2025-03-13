import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { CreateBookReviewSchema } from 'src/books/schemas/book.schema';

export class CreateBookReviewDto
	implements z.infer<typeof CreateBookReviewSchema>
{
	@ApiProperty({
		description: 'Отзыв',
		example: 'Развёрнутый отзыв'
	})
	readonly review: string;
	@ApiProperty({
		description: 'Заметка (Отзыв в 2х словах)',
		example: 'Книга огонь! Рекомендую к прочтению'
	})
	readonly note: string;
	@ApiProperty({
		description: 'ID Книги',
		example: 1
	})
	readonly bookId: number;
}
