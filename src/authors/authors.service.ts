import { Injectable } from '@nestjs/common';
import { Author } from './models/authors.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAuthorDto } from './dto/request/create-author.dto';
import { UpdateAuthorDto } from './dto/request/update-author.dto';

@Injectable()
export class AuthorsService {
	constructor(@InjectModel(Author) private authorRepository: typeof Author) {}

	async createAuthor(dto: CreateAuthorDto) {
		const author = await this.authorRepository.create(dto);
		return author;
	}

	async getAllAuthors() {
		const authors = await this.authorRepository.findAll({
			include: { all: true }
		});
		return authors;
	}

	async getAuthorById(id: number) {
		const author = await this.authorRepository.findByPk(id, {
			include: { all: true }
		});
		return author;
	}

	async updateAuthor(id: number, dto: UpdateAuthorDto) {
		const [_, updated] = await this.authorRepository.update(dto, {
			where: { id },
			returning: true
		});
		return updated[0];
	}

	async deleteAuthor(id: number) {
		const author = await this.authorRepository.destroy({
			where: { id },
			force: true
		});
		return author;
	}
}
