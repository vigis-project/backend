import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WishListService } from './wish-list.service';
import { WishListController } from './wish-list.controller';
import { WishList } from './models/wish-list.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [WishListController],
	providers: [WishListService],
	imports: [SequelizeModule.forFeature([WishList]), UsersModule, AuthModule],
	exports: [WishListService]
})
export class WishListModule {}
