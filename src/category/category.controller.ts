import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	NotFoundException
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';
import { CategoryDtoResponse } from './dto/response/category-response.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() dto: CreateCategoryDto) {
		const category = await this.categoryService.create(dto);
		return CategoryDtoResponse.fromCategory(category);
	}

	@Get()
	async findAll() {
		const categories = await this.categoryService.getAll();
		if (!categories.length) {
			throw new NotFoundException('No categories found');
		}
		return categories.map(CategoryDtoResponse.fromCategory);
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		const category = await this.categoryService.getById(id);
		if (category) {
			return CategoryDtoResponse.fromCategory(category);
		}
		throw new NotFoundException(`Category with id = ${id} not found`);
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
		const updatedCategory = await this.categoryService.update(id, dto);
		if (!updatedCategory) {
			throw new NotFoundException(`Category with id = ${id} not found`);
		}
		return CategoryDtoResponse.fromCategory(updatedCategory);
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		return this.categoryService.delete(id);
	}
}
