import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class CustomZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: ZodSchema) {}

	transform(value: unknown) {
		try {
			return this.schema.parse(value);
		} catch (error) {
			throw new BadRequestException({
				message: 'Ошибка валидации',
				errors: error.errors
			});
		}
	}
}
