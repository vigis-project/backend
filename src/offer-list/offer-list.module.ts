import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OfferList } from './models/offer-list.model';
import { OfferListService } from './offer-list.service';
import { OfferListController } from './offer-list.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { BooksModule } from 'src/books/books.module';

@Module({
	controllers: [OfferListController],
	providers: [OfferListService],
	imports: [
		SequelizeModule.forFeature([OfferList]),
		BooksModule,
		UsersModule,
		AuthModule
	],
	exports: [OfferListService]
})
export class OfferListModule {}
