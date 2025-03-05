// TODO: Сделать поля, связанные с квартирой (addrApart)/номером строения (addrStructure) не обязательными

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserAddressDto {
	@ApiProperty({
		description: 'Почтовый индекс пользователя',
		type: String
	})
	readonly addrIndex: string;

	@ApiProperty({
		description: 'Город пользователя',
		type: String
	})
	readonly addrCity: string;

	@ApiProperty({
		description: 'Улица пользователя',
		type: String
	})
	readonly addrStreet: string;

	@ApiProperty({
		description: 'Номер дома пользователя',
		type: String
	})
	readonly addrHouse: string;

	@ApiProperty({
		description: 'Номер строения (необязательное поле)',
		type: String,
		required: false
	})
	readonly addrStructure?: string;

	@ApiProperty({
		description: 'Номер квартиры (необязательное поле)',
		type: String,
		required: false
	})
	readonly addrApart?: string;

	@ApiProperty({
		description: 'Идентификатор пользователя',
		type: Number
	})
	readonly idUser: number;
}
