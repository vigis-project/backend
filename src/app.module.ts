import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/models/users.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { Sequelize } from 'sequelize-typescript';
import { BooksModule } from './books/books.module';
import { Book } from './books/models/books.model';
import { BookReview } from './books/models/book-review.models';
import { AuthorsModule } from './authors/authors.module';
import { Author } from './authors/models/authors.model';
import { UserAddress } from './users/models/user-address.model';
import { OfferListModule } from './offer-list/offer-list.module';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			models: [
				User,
				Role,
				UserRoles,
				Book,
				BookReview,
				Author,
				UserAddress
			],
			autoLoadModels: true,
			synchronize: true
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		BooksModule,
		AuthorsModule,
		OfferListModule
	]
})
export class AppModule {
	constructor(private sequelize: Sequelize) {}

	async onModuleInit() {
		await this.sequelize.sync({ alter: true });
	}
}
