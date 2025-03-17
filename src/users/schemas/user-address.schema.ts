import { z } from 'zod';

export const CreateUserAddressSchema = z.object({
	addrIndex: z
		.string()
		.length(6, { message: 'Почтовый индекс должен содержать 6 символов' }),
	addrCity: z.string().max(35, {
		message: 'Название города не должно превышать 35 символов'
	}),
	addrStreet: z
		.string()
		.max(25, { message: 'Название улицы не должно превышать 25 символов' }),
	addrHouse: z
		.string()
		.max(5, { message: 'Номер дома не должен превышать 5 символов' }),
	addrStructure: z
		.string()
		.max(3, { message: 'Номер строения не должен превышать 3 символов' })
		.optional(),
	addrApart: z
		.string()
		.max(5, { message: 'Номер квартиры не должен превышать 5 символов' })
		.optional(),
	userId: z.number().int().positive({
		message: 'ID пользователя должен быть положительным числом'
	}),
	isDefault: z.boolean().optional().default(false)
});

export const UpdateUserAddressSchema = CreateUserAddressSchema.omit({
	userId: true,
	isDefault: true
}).partial();
