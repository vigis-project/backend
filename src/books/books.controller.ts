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
	NotFoundException
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BookResponseDto } from './dto/response/book-response.dto';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для создания книги, требует JWT токен с ролью STAFF или ADMIN'
	})
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN', 'STAFF')
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

		const books = await this.booksService.getAllBooks();
		const booksDTOs: BookResponseDto[] = [];

		books.slice((page - 1) * limit, page * limit).map((b) => {
			booksDTOs.push(
				new BookResponseDto(b.id, b.bookName, b.note, b.authorId)
			);
		});

		return booksDTOs;
	}

	@ApiOperation({ summary: 'Получить книгу по id' })
	@Get(':id')
	async findOne(@Param('id') id: string) {
		const book = await this.booksService.getBookById(+id);
		if (book) {
			return new BookResponseDto(
				book.id,
				book.bookName,
				book.note,
				book.authorId
			);
		}
		throw new NotFoundException(`Книга с id = ${id} не найден`);
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
		@Param('id') id: string,
		@Body() updateBookDto: UpdateBookDto
	) {
		return await this.booksService.updateBook(+id, updateBookDto);
	}

	@Delete(':id')
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для удаления книги, требует JWT токен с ролью STAFF или ADMIN'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	async remove(@Param('id') id: string) {
		return await this.booksService.deleteBook(+id);
	}
}
