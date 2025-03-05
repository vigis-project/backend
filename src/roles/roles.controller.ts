import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles-auth.decorator';

@Controller('roles')
export class RolesController {
	constructor(private roleService: RolesService) {}

	@Post()
	@ApiBearerAuth()
	@ApiOperation({
		summary: 'Эндпоинт для создания роли, требует JWT токен с ролью ADMIN'
	})
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	create(@Body() dto: CreateRoleDto) {
		return this.roleService.createRole(dto);
	}

	@Get('/:value')
	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Эндпоинт для получения роли по value, требует JWT токен с ролью ADMIN'
	})
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('ADMIN')
	@ApiOperation({ summary: 'Получить роль по значению (value)' })
	getByValue(@Param('value') value: string) {
		return this.roleService.getRoleByValue(value);
	}
}
