import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './models/books.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Autor } from 'src/autors/models/autors.model';
import { AutorsService } from 'src/autors/autors.service';

@Injectable()
export class BooksService {
	constructor(
		@InjectModel(Book) private bookRepository: typeof Book,
		private readonly autorService: AutorsService
	) {}

	async createBook(dto: CreateBookDto) {
		const autor = await this.autorService.getAutorById(dto.autorId);

		if (autor) {
			const book = await this.bookRepository.create({
				bookName: dto.bookName,
				note: dto.note,
				autorId: autor.id
			});

			return book;
		}

		throw new NotFoundException(`Автор с id ${dto.autorId} не найден.`);
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
