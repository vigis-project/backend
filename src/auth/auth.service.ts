import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/request/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/request/login.dto';
import { User } from 'src/users/models/users.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
		private mailService: MailerService
	) {}

	async login(userDto: LoginDto) {
		const user = await this.validateUser(userDto);
		return this.generateToken(user);
	}

	async register(userDto: CreateUserDto) {
		const candidateEmail = await this.userService.getUserByEmail(
			userDto.email,
			true
		);
		if (candidateEmail) {
			throw new HttpException(
				'Пользователь с таким email уже существует.',
				HttpStatus.BAD_REQUEST
			);
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5);
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword
		});

		this.mailService.sendMail({
			from: `Vigis <${process.env.EMAIL_USERNAME}>`,
			to: `${user.email}`,
			subject: `Успешная регистрация`,
			text: `Регистрация прошла успешно! Добро пожаловать на платформу Vigis!`
		});

		return this.generateToken(user);
	}

	private async generateToken(user: User) {
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
		const user = await this.userService.getUserByEmail(userDto.email);
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
