import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/request/login.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() userDto: LoginDto) {
		return this.authService.login(userDto);
	}

	@Post('/register')
	register(@Body() userDto: CreateUserDto) {
		return this.authService.register(userDto);
	}
}
