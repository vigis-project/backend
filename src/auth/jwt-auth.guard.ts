import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest, AuthUserData } from './types';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest<AuthRequest>();

		try {
			const token = this.extractTokenFromHeader(req);

			if (!token) {
				throw new UnauthorizedException({
					message: 'Пользователь не авторизован'
				});
			}

			const user = this.jwtService.verify<AuthUserData>(token);
			req.user = user;
		} catch (e) {
			throw new UnauthorizedException({
				message: 'Пользователь не авторизован'
			});
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] =
			request.headers['authorization']?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}
}
