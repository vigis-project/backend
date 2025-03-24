import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserListService } from './user-list.service';
import { UserListController } from './user-list.controller';
import { UserList } from './models/user-list.model';
import { TypeList } from './models/type-list.model';
import { List } from './models/list.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [UserListController],
	providers: [UserListService],
	imports: [
		SequelizeModule.forFeature([UserList, TypeList, List]),
		AuthModule
	],
	exports: [UserListService]
})
export class UserListModule {}
