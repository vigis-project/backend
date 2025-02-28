import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) {}

	@Post()
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	createBook(@Body() createBookDto: CreateBookDto) {
		return this.booksService.createBook(createBookDto);
	}

	@Get()
	findAll() {
		return this.booksService.getAllBooks();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.booksService.getBookById(+id);
	}

	@Patch(':id')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
		return this.booksService.updateBook(+id, updateBookDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.booksService.deleteBook(+id);
	}
}
