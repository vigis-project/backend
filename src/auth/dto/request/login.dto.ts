import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty({
		description: 'Email пользователя',
		example: 'example@gmail.com'
	})
	readonly email: string;

	@ApiProperty({
		description: 'Пароль пользователя',
		example: 'StrongPassword1234'
	})
	readonly password: string;
}
