import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { Book } from './models/books.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/request/create-book.dto';
import { UpdateBookDto } from './dto/request/update-book.dto';
import { AuthorsService } from 'src/authors/authors.service';

@Injectable()
export class BooksService {
	constructor(
		@InjectModel(Book) private bookRepository: typeof Book,
		private readonly authorService: AuthorsService
	) {}

	async createBook(dto: CreateBookDto) {
		const author = await this.authorService.getAuthorById(dto.authorId);

		const existingBook = await this.bookRepository.findOne({
			where: { bookName: dto.bookName }
		});

		if (existingBook) {
			throw new ConflictException(
				`Книга с именем ${dto.bookName} уже существует.`
			);
		}

		if (author) {
			const book = await this.bookRepository.create({
				bookName: dto.bookName,
				note: dto.note,
				ISBN: dto.ISBN,
				authorId: author.id
			});

			return book;
		}

		throw new NotFoundException(`Автор с id ${dto.authorId} не найден.`);
	}

	async getAllBooks(offset: number, limit: number) {
		return Book.findAll({
			offset,
			limit
		});
	}

	async getBookById(id: number) {
		const book = await this.bookRepository.findByPk(id);
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
		const book = await this.bookRepository.findByPk(id);
		if (!book) {
			throw new NotFoundException(`Книга с id ${id} не найдена.`);
		}

		if (dto.authorId) {
			const author = await this.authorService.getAuthorById(dto.authorId);
			if (!author) {
				throw new NotFoundException(
					`Автор с id ${dto.authorId} не найден.`
				);
			}
		}

		if (dto.bookName && dto.bookName !== book.bookName) {
			const existingBook = await this.bookRepository.findOne({
				where: { bookName: dto.bookName }
			});

			if (existingBook) {
				throw new ConflictException(
					`Книга с именем ${dto.bookName} уже существует.`
				);
			}
		}

		const [rowsUpdated, [updatedBook]] = await this.bookRepository.update(
			dto,
			{
				where: { id },
				returning: true
			}
		);

		if (!rowsUpdated) {
			throw new NotFoundException(`Книга с id ${id} не найдена.`);
		}

		return updatedBook;
	}

	async deleteBook(id: number) {
		const deleted = await this.bookRepository.destroy({ where: { id } });
		return deleted
			? { message: 'Book deleted successfully' }
			: { message: 'Book not found' };
	}
}
