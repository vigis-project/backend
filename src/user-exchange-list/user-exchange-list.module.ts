import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserExchangeService } from './user-exchange-list.service';
import { UserExchangeController } from './user-exchange-list.controller';
import { UserExchangeList } from './models/user-exchange-list.model';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { ExchangeListModule } from 'src/exchange-list/exchange-list.module';
import { OfferListModule } from 'src/offer-list/offer-list.module';

@Module({
	controllers: [UserExchangeController],
	providers: [UserExchangeService],
	imports: [
		SequelizeModule.forFeature([UserExchangeList]),
		UsersModule,
		AuthModule,
		OfferListModule,
		ExchangeListModule
	],
	exports: [UserExchangeService]
})
export class UserExchangeModule {}
