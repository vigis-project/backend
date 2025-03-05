import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
	@ApiProperty({
		description: 'Имя книги',
		example: 'Пикник на обочине',
		maxLength: 50
	})
	readonly bookName: string;
	@ApiProperty({
		description: 'Короткое описание книги (Заметка)',
		example: 'Классика отечественной фантастики',
		maxLength: 50
	})
	readonly note: string;
}
