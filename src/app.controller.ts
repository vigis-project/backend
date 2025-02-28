import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthRequest } from './auth/types';
import { Roles } from './roles/roles-auth.decorator';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	getHello() {
		return 'Hello World!';
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles('USER')
	@Get('/date')
	getDate(@Req() req: AuthRequest) {
		console.log(req.user);
		return new Date(Date.now());
	}
}
