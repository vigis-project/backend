import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserAddressDto {
	@ApiProperty({
		description: 'Почтовый индекс пользователя',
		type: String,
		required: false,
		example: '123456'
	})
	addrIndex?: string;

	@ApiProperty({
		description: 'Город пользователя',
		type: String,
		required: false,
		example: 'Самара'
	})
	addrCity?: string;

	@ApiProperty({
		description: 'Улица пользователя',
		type: String,
		required: false,
		example: 'Пушкина'
	})
	addrStreet?: string;

	@ApiProperty({
		description: 'Номер дома пользователя',
		type: String,
		required: false,
		example: '10'
	})
	addrHouse?: string;

	@ApiProperty({
		description: 'Номер строения',
		type: String,
		required: false,
		example: '1'
	})
	addrStructure?: string;

	@ApiProperty({
		description: 'Номер квартиры',
		type: String,
		required: false,
		example: '25'
	})
	addrApart?: string;
}
