import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	NotFoundException,
	UsePipes,
	Res,
	HttpStatus
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomZodValidationPipe } from 'src/pipes/custom-zod-validation-pipe.pipe';
import { CreateBookSchema, UpdateBookSchema } from './schemas/book.schema';
import { Response } from 'express';

@Controller('books')
export class BooksController {
	private readonly OPEN_LIBRARY_COVER_URL =
		'https://covers.openlibrary.org/b/isbn';

	constructor(private readonly booksService: BooksService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для создания книги, требует JWT токен с ролью STAFF или ADMIN'
	})
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN', 'STAFF')
	@UsePipes(new CustomZodValidationPipe(CreateBookSchema))
	createBook(@Body() createBookDto: CreateBookDto) {
		return this.booksService.createBook(createBookDto);
	}

	@ApiOperation({ summary: 'Получить все книги' })
	@ApiQuery({
		name: 'limit',
		type: Number,
		default: 10,
		description: 'Количество книг, возвращаемых при запросе',
		required: false
	})
	@ApiQuery({
		name: 'page',
		type: Number,
		default: 1,
		description: 'Страница книг, возвращаемых при запросе',
		required: false
	})
	@Get()
	async findAll(
		@Query('limit') limit: number | undefined,
		@Query('page') page: number | undefined
	) {
		limit = limit ?? 10;
		page = page ?? 1;

		const offset = (page - 1) * limit;

		const books = await this.booksService.getAllBooks(offset, limit);

		return books;
	}

	@ApiOperation({ summary: 'Получить книгу по id' })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const book = await this.booksService.getBookById(+id);
		if (book) {
			return book;
		}
		throw new NotFoundException(`Книга с id = ${id} не найден`);
	}

	@ApiOperation({
		summary: 'Получить обложку книги по ISBN',
		description:
			'Перенаправляет на URL обложки в Open Library. Поддерживает размеры S, M, L.'
	})
	@ApiParam({
		name: 'ISBN',
		type: String,
		description:
			'ISBN книги (10 или 13 символов, без дефисов). Пример: 9781613743447',
		example: '9781613743447'
	})
	@ApiParam({
		name: 'size',
		enum: ['S', 'M', 'L'],
		description: 'Размер обложки: S (маленький), M (средний), L (большой)',
		example: 'L'
	})
	@ApiResponse({
		status: HttpStatus.FOUND,
		description: 'Редирект на обложку в Open Library',
		headers: {
			Location: {
				description: 'URL обложки',
				example:
					'https://covers.openlibrary.org/b/isbn/9783161484100-L.jpg'
			}
		}
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Обложка не найдена для указанного ISBN',
		schema: {
			example: { message: 'Обложка не найдена' }
		}
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Ошибка сервера при запросе обложки',
		schema: {
			example: {
				message: 'Ошибка при получении обложки',
				error: 'Error details...'
			}
		}
	})
	@Get('cover/:ISBN/:size')
	async getBookCoverByISBN(
		@Param('ISBN') ISBN: string,
		@Param('size') size: 'L' | 'M' | 'S',
		@Res() res: Response
	) {
		try {
			size = size ?? 'L';
			const coverUrl = `${this.OPEN_LIBRARY_COVER_URL}/${ISBN}-${size}.jpg`;

			const response = await fetch(coverUrl, { method: 'HEAD' });

			if (response.ok) {
				return res.redirect(HttpStatus.FOUND, coverUrl);
			} else {
				return res.status(HttpStatus.NOT_FOUND).json({
					message: 'Обложка не найдена'
				});
			}
		} catch (error) {
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				message: 'Ошибка при получении обложки',
				error: error.message
			});
		}
	}

	@Patch(':id')
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для обновления книги, требует JWT токен с ролью STAFF или ADMIN'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	async update(
		@Param('id') id: number,
		@Body(new CustomZodValidationPipe(UpdateBookSchema))
		updateBookDto: UpdateBookDto
	) {
		return await this.booksService.updateBook(id, updateBookDto);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для удаления книги, требует JWT токен с ролью STAFF или ADMIN'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	async remove(@Param('id') id: number) {
		return await this.booksService.deleteBook(id);
	}
}
