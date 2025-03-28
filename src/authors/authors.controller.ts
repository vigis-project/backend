import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	Query,
	NotFoundException
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/request/create-author.dto';
import { UpdateAuthorDto } from './dto/request/update-author.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuthorResponseDto } from './dto/response/author-response.dto';

@Controller('authors')
export class AuthorsController {
	constructor(private readonly authorsService: AuthorsService) {}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Создать автора, требует JWT токен с ролью ADMIN или STAFF'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	create(@Body() createAuthorDto: CreateAuthorDto) {
		return this.authorsService.createAuthor(createAuthorDto);
	}

	@ApiOperation({ summary: 'Получить всех авторов' })
	@ApiQuery({
		name: 'limit',
		type: Number,
		default: 10,
		description: 'Количество авторов, возвращаемых при запросе',
		required: false
	})
	@ApiQuery({
		name: 'page',
		type: Number,
		default: 1,
		description: 'Страница авторов, возвращаемых при запросе',
		required: false
	})
	@Get()
	async findAll(
		@Query('limit') limit: number | undefined,
		@Query('page') page: number | undefined
	) {
		limit = limit ?? 10;
		page = page ?? 1;

		const authors = await this.authorsService.getAllAuthors();
		const authorsDTOs: AuthorResponseDto[] = [];
		authors.slice((page - 1) * limit, page * limit).map((a) => {
			authorsDTOs.push(
				new AuthorResponseDto(a.id, a.firstName, a.lastName)
			);
		});

		return authorsDTOs;
	}

	@ApiOperation({ summary: 'Получить автора по id' })
	@Get(':id')
	async findOne(@Param('id') id: number) {
		const author = await this.authorsService.getAuthorById(id);
		if (author) {
			return new AuthorResponseDto(
				author.id,
				author.firstName,
				author.lastName
			);
		}
		throw new NotFoundException(`Автор с id = ${id} не найден`);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Обновить автора, требует JWT токен с ролью ADMIN или STAFF'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Patch(':id')
	async update(
		@Param('id') id: number,
		@Body() updateAuthorDto: UpdateAuthorDto
	) {
		return await this.authorsService.updateAuthor(id, updateAuthorDto);
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Удалить автора, требует JWT токен с ролью ADMIN или STAFF'
	})
	@Roles('ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Delete(':id')
	async remove(@Param('id') id: number) {
		return await this.authorsService.deleteAuthor(id);
	}
}
