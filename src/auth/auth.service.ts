import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) {}

	async login(userDto: LoginDto) {
		const user = await this.validateUser(userDto);
		return this.generateToken(user);
	}

	async registration(userDto: CreateUserDto) {
		const candidateEmail = await this.userService.getUserByEmail(
			userDto.email
		);
		if (candidateEmail) {
			throw new HttpException(
				'Пользователь с таким email уже существует.',
				HttpStatus.BAD_REQUEST
			);
		}
		const candidateUsername = await this.userService.getUserByUsername(
			userDto.username
		);
		if (candidateUsername) {
			throw new HttpException(
				'Пользователь с таким username уже существует.',
				HttpStatus.BAD_REQUEST
			);
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword
		});
		return this.generateToken(user);
	}

	private async generateToken(user) {
		const payload = {
			id: user.id,
			email: user.email,
			username: user.username,
			roles: user.roles
		};
		return {
			token: this.jwtService.sign(payload)
		};
	}

	private async validateUser(userDto: LoginDto) {
		const user = await this.userService.getUserByUsername(userDto.username);
		if (user) {
			const passwordEquals = await bcrypt.compare(
				userDto.password,
				user.password
			);
			if (passwordEquals) {
				return user;
			}
		}
		throw new UnauthorizedException({
			message: 'Некорректный email или пароль.'
		});
	}
}
