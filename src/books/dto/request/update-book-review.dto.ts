import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookReviewDto {
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
