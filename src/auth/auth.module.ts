import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService, JwtModule],
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: process.env.EMAIL_HOST,
					port: process.env.EMAIL_PORT?.toString(),
					secure: false,
					auth: {
						user: process.env.EMAIL_USERNAME,
						pass: process.env.EMAIL_PASSWORD
					}
				},
				defaults: {
					from: `Vigis <${process.env.EMAIL_USERNAME}>`
				}
			})
		}),
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.JWT_PRIVATE_KEY || 'SUPER_MEGA_SECRET',
			signOptions: {
				expiresIn: process.env.JWT_LIFE_TIME || '24h'
			}
		})
	]
})
export class AuthModule {}
