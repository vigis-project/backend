import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserValueCategory } from './models/user-value-category.model';
import { CreateUserValueCategoryDto } from './dto/create-user-value-category.dto';
import { UpdateUserValueCategoryDto } from './dto/update-user-value-category.dto';
import { UserList } from 'src/user-list/models/user-list.model';
import { Category } from 'src/category/models/category.model';

@Injectable()
export class UserValueCategoryService {
	constructor(
		@InjectModel(UserValueCategory)
		private repository: typeof UserValueCategory
	) {}

	async create(dto: CreateUserValueCategoryDto) {
		return await this.repository.create(dto);
	}

	async getAll() {
		return await this.repository.findAll({ include: [UserList, Category] });
	}

	async getById(id: number) {
		const entity = await this.repository.findByPk(id, {
			include: [UserList, Category]
		});
		if (!entity)
			throw new NotFoundException(
				`UserValueCategory with id ${id} not found`
			);
		return entity;
	}

	async update(id: number, dto: UpdateUserValueCategoryDto) {
		const [rowsUpdated, [updatedEntity]] = await this.repository.update(
			dto,
			{
				where: { idUserValueCategory: id },
				returning: true
			}
		);
		return rowsUpdated ? updatedEntity : null;
	}

	async delete(id: number) {
		const deleted = await this.repository.destroy({
			where: { idUserValueCategory: id }
		});
		return deleted
			? { message: 'Deleted successfully' }
			: { message: 'Not found' };
	}
}
