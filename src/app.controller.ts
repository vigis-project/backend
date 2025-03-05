import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthRequest } from './auth/types';
import { Roles } from './roles/roles-auth.decorator';
import { RolesGuard } from './roles/roles.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Тестовый эндпоинт, не требует JWT токен' })
	getHello() {
		return 'Hello World!';
	}

	@ApiBearerAuth()
	@ApiOperation({
		summary:
			'Тестовый эндпоинт, требует JWT токен с любой ролью, в случае успеха вернёт текущую дату'
	})
	@Roles('USER', 'ADMIN', 'STAFF')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Get('/date')
	getDate(@Req() req: AuthRequest) {
		console.log(req.user);
		return new Date(Date.now());
	}
}
