import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateBookSchema } from 'src/books/schemas/book.schema';

export class UpdateBookDto implements z.infer<typeof UpdateBookSchema> {
	@ApiProperty({
		description: 'Имя книги',
		example: 'Пикник на обочине',
		maxLength: 50,
		required: false
	})
	readonly bookName?: string;

	@ApiProperty({
		description: 'Короткое описание книги (Заметка)',
		example: 'Классика отечественной фантастики',
		maxLength: 50,
		required: false
	})
	readonly note?: string;

	@ApiProperty({
		description: 'ID автора книги',
		example: 1,
		required: false
	})
	readonly authorId?: number;

	@ApiProperty({
		description: 'Рейтинг книги (от 0 до 10)',
		example: 9,
		required: false
	})
	readonly rating?: number;
}
