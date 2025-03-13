import { z } from 'zod';

export const CreateBookSchema = z.object({
	bookName: z
		.string()
		.min(1, { message: 'Название книги обязательно' })
		.max(50),
	note: z.string().min(1, { message: 'Описание книги обязательно' }).max(50),
	authorId: z
		.number()
		.int()
		.positive({ message: 'ID автора должно быть положительным числом' }),
	rating: z.number().int().min(0).max(10).optional()
});

export const UpdateBookSchema = CreateBookSchema.partial();

export const CreateBookReviewSchema = z.object({
	review: z.string().min(1, { message: 'Отзыв обязателен' }).max(500),
	note: z.string().min(1, { message: 'Заметка обязательна' }).max(50),
	bookId: z
		.number()
		.int()
		.positive({ message: 'ID книги должно быть положительным числом' })
});

export const UpdateBookReviewSchema = CreateBookReviewSchema.partial();
