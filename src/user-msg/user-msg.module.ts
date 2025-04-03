import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserMsg } from './models/user-msg.model';
import { UserMsgService } from './user-msg.service';
import { UserMsgController } from './user-msg.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UserMsgController],
	providers: [UserMsgService],
	imports: [SequelizeModule.forFeature([UserMsg]), UsersModule, AuthModule],
	exports: [UserMsgService]
})
export class UserMsgModule {}
