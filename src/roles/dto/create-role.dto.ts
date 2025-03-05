import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({
		description: 'Значение роли',
		example: 'STAFF'
	})
	readonly value: string;
	@ApiProperty({
		description: 'Описание',
		example: 'Роль сотрудника'
	})
	readonly description: string;
}
