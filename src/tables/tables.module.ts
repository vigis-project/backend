import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { User } from 'src/users/models/users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { Book } from 'src/books/models/books.model';
import { BookReview } from 'src/books/models/book-review.models';
import { Author } from 'src/authors/models/authors.model';
import { UserAddress } from 'src/users/models/user-address.model';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { BooksService } from 'src/books/books.service';
import { AuthorsService } from 'src/authors/authors.service';
import { UserAddressService } from 'src/users/users-address.service';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [TablesController],
	imports: [
		SequelizeModule.forFeature([
			User,
			Role,
			UserRoles,
			Book,
			BookReview,
			Author,
			UserAddress
		]),
		RolesModule,
		forwardRef(() => AuthModule)
	],
	providers: [
		TablesService,
		UsersService,
		RolesService,
		BooksService,
		AuthorsService,
		UserAddressService
	]
})
export class TablesModule {}
