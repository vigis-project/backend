import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './models/books.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { BookReview } from './models/book-review.models';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { BookReviewService } from './book-review.service';
import { BookReviewController } from './book-review.controller';
import { AutorsModule } from 'src/autors/autors.module';

@Module({
	controllers: [BooksController, BookReviewController],
	providers: [BooksService, BookReviewService],
	imports: [
		SequelizeModule.forFeature([Book, BookReview]),
		AutorsModule,
		UsersModule,
		RolesModule,
		AuthModule
	],

	exports: [BooksService, BookReviewService]
})
export class BooksModule {}
