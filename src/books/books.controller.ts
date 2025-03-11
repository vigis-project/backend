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
	BadRequestException,
	UsePipes
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CustomZodValidationPipe } from 'src/pipes/custom-zod-validation-pipe.pipe';
import { CreateBookSchema, UpdateBookSchema } from './schemas/book.schema';

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
