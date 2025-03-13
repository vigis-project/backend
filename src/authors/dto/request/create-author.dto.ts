import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
	@ApiProperty({
		description: 'Фамилия автора',
		example: 'Стругацкий'
	})
	readonly lastName: string;
	@ApiProperty({
		description: 'Имя автора',
		example: 'Борис'
	})
	readonly firstName: string;
}
