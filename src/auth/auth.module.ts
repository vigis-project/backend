import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService, JwtModule],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.JWT_PRIVATE_KEY,
			signOptions: {
				expiresIn: process.env.JWT_LIFE_TIME || '24h'
			}
		})
	]
})
export class AuthModule {}
