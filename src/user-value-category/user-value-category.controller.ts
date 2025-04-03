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
import { UserValueCategoryService } from './user-value-category.service';
import { CreateUserValueCategoryDto } from './dto/create-user-value-category.dto';
import { UpdateUserValueCategoryDto } from './dto/update-user-value-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserValueCategory } from './models/user-value-category.model';
import { UserValueCategoryDtoResponse } from './dto/response/user-value-category-response.dto';

@Controller('user-value-category')
export class UserValueCategoryController {
	constructor(private readonly service: UserValueCategoryService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() dto: CreateUserValueCategoryDto) {
		return this.service.create(dto);
	}

	@Get()
	async findAll() {
		const entities: UserValueCategory[] = await this.service.getAll();
		return entities.map(UserValueCategoryDtoResponse.fromUserValueCategory);
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		const entity = await this.service.getById(id);
		if (entity) {
			return UserValueCategoryDtoResponse.fromUserValueCategory(entity);
		}
		throw new NotFoundException(
			`UserValueCategory with id = ${id} not found`
		);
	}

	@Patch(':id')
	update(@Param('id') id: number, @Body() dto: UpdateUserValueCategoryDto) {
		return this.service.update(id, dto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.service.delete(id);
	}
}
