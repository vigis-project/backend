import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
	@ApiProperty({
		description: 'Имя книги',
		example: 'Пикник на обочине'
	})
	readonly bookName: string;
	@ApiProperty({
		description: 'Короткое описание книги',
		example: 'Классика отечественной фантастики',
		maxLength: 50
	})
	readonly note: string;
	@ApiProperty({
		description: 'ID Автора',
		example: 1
	})
	readonly authorId: number;
}
