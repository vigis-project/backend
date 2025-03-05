import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		description: 'Email пользователя',
		example: 'example@gmail.com'
	})
	readonly email: string;

	@ApiProperty({
		description: 'Username пользователя',
		example: 'Oleg7755'
	})
	readonly username: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'StrongPassword1234'
	})
	readonly password: string;

	@ApiProperty({
		description: 'Имя пользователя',
		example: 'Олег'
	})
	readonly firstName: string;

	@ApiProperty({
		description: 'Фамилия пользователя',
		example: 'Шило'
	})
	readonly lastName: string;

	@ApiProperty({
		description: 'Отчество пользователя',
		example: 'Романович'
	})
	readonly secondName: string;
}
