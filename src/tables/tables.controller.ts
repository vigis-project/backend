import {
	Controller,
	Get,
	Param,
	NotFoundException,
	UseGuards
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tables')
export class TablesController {
	constructor(private readonly tablesService: TablesService) {}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт, возвращающий список полей в таблице. Требует JWT токен с ролью администратора.'
	})
	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get(':table/fields')
	async getTableFields(@Param('table') table: string) {
		const fields = await this.tablesService.getTableFields(table);
		if (!fields) throw new NotFoundException(`Table '${table}' not found`);
		return fields;
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт, возвращающий список таблиц в виде ключ-значение (ключ - название на серверной части, значение - название, более понятное пользователям). Требует JWT токен с ролью администратора.'
	})
	@Roles('ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get()
	getTableList() {
		return {
			authors: 'Авторы',
			books: 'Книги',
			users: 'Пользователи',
			roles: 'Роли',
			categories: 'Категории',
			offers: 'Обмены'
		};
	}
}
