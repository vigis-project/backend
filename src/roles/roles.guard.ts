import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';
import { AuthRequest } from '../auth/types';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()]
			);

			if (!requiredRoles) return true;

			const req = context.switchToHttp().getRequest<AuthRequest>();
			const user = req.user;

			if (!user) {
				throw new UnauthorizedException({
					message: 'Пользователь не авторизован.'
				});
			}

			return user.roles.some((role) =>
				requiredRoles.includes(role.value)
			);
		} catch (e) {
			throw new HttpException('Нет доступа.', HttpStatus.FORBIDDEN);
		}
	}
}
