import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './models/books.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
	constructor(
		@InjectModel(Book) private bookRepository: typeof Book,
		private readonly authorService: AuthorsService
	) {}

	async createBook(dto: CreateBookDto) {
		const author = await this.authorService.getAuthorById(dto.authorId);

		if (author) {
			const book = await this.bookRepository.create({
				bookName: dto.bookName,
				note: dto.note,
				authorId: author.id
			});

			return book;
		}

		throw new NotFoundException(`Автор с id ${dto.authorId} не найден.`);
	}

	async getAllBooks() {
		const books = await this.bookRepository.findAll({
			include: { all: true }
		});
		return books;
	}

	async getBookById(id: number) {
		const book = await this.bookRepository.findByPk(id, {
			include: { all: true }
		});
		return book;
	}

	async getBookByName(bookName: string) {
		const book = await this.bookRepository.findOne({
			where: { bookName },
			include: { all: true }
		});
		return book;
	}

	async updateBook(id: number, dto: UpdateBookDto) {
		const [rowsUpdated, [updatedBook]] = await this.bookRepository.update(
			dto,
			{
				where: { id },
				returning: true
			}
		);
		return rowsUpdated ? updatedBook : null;
	}

	async deleteBook(id: number) {
		const deleted = await this.bookRepository.destroy({ where: { id } });
		return deleted
			? { message: 'Book deleted successfully' }
			: { message: 'Book not found' };
	}
}
