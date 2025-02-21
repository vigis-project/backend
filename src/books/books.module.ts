import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './models/books.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/users.module';
import { BookReview } from './models/book-review.models';

@Module({
	controllers: [BooksController],
	providers: [BooksService],
	imports: [SequelizeModule.forFeature([Book, BookReview]), UsersModule],

	exports: [BooksService]
})
export class BooksModule {}
