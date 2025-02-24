import { Injectable } from '@nestjs/common';
import { Autor } from './models/autors.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { log } from 'console';

@Injectable()
export class AutorsService {
	constructor(@InjectModel(Autor) private autorRepository: typeof Autor) {}

	async createAutor(dto: CreateAutorDto) {
		const autor = await this.autorRepository.create(dto);
		return autor;
	}

	async getAllAutors() {
		const autors = await this.autorRepository.findAll({
			include: { all: true }
		});
		return autors;
	}

	async getAutorById(id: number) {
		const autor = await this.autorRepository.findByPk(id, {
			include: { all: true }
		});
		return autor;
	}

	async updateAutor(id: number, dto: UpdateAutorDto) {
		const [_, updated] = await this.autorRepository.update(dto, {
			where: { id },
			returning: true
		});
		return updated[0];
	}

	async deleteAutor(id: number) {
		const autor = await this.autorRepository.destroy({
			where: { id },
			force: true
		});
		return autor;
	}
}
