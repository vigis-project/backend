import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ExchangeList } from './models/exchange-list.model';
import { ExchangeListService } from './exchange-list.service';
import { ExchangeListController } from './exchange-list.controller';
import { OfferListModule } from 'src/offer-list/offer-list.module';
import { WishListModule } from 'src/wish-list/wish-list.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [ExchangeListController],
	providers: [ExchangeListService],
	imports: [
		SequelizeModule.forFeature([ExchangeList]),
		OfferListModule,
		WishListModule,
		AuthModule
	],
	exports: [ExchangeListService]
})
export class ExchangeListModule {}
