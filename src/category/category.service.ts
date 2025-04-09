import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category)
		private categoryRepository: typeof Category
	) {}

	async create(dto: CreateCategoryDto) {
		return await this.categoryRepository.create(dto);
	}

	async getSelection(page: number, limit: number) {
		const offset = (page - 1) * limit;

		return await this.categoryRepository.findAll({
			include: { all: true },
			limit,
			offset
		});
	}

	async getAll() {
		return await this.categoryRepository.findAll({
			include: { all: true }
		});
	}

	async getById(id: number) {
		const category = await this.categoryRepository.findByPk(id, {
			include: { all: true }
		});
		if (!category) {
			throw new NotFoundException(`Category with id ${id} not found`);
		}
		return category;
	}

	async update(id: number, dto: UpdateCategoryDto) {
		const [rowsUpdated, updatedCategories] =
			await this.categoryRepository.update(dto, {
				where: { categoryId: id },
				returning: true
			});

		if (!rowsUpdated) {
			throw new NotFoundException(`Category with id = ${id} not found`);
		}

		return updatedCategories[0];
	}

	async delete(id: number) {
		const deleted = await this.categoryRepository.destroy({
			where: { categoryId: id }
		});

		if (!deleted) {
			throw new NotFoundException(`Category with id = ${id} not found`);
		}

		return { message: 'Category deleted successfully' };
	}
}
