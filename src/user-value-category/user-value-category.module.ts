import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserValueCategory } from './models/user-value-category.model';
import { UserValueCategoryService } from './user-value-category.service';
import { UserValueCategoryController } from './user-value-category.controller';
import { UserList } from 'src/user-list/models/user-list.model';
import { Category } from 'src/category/models/category.model';

@Module({
	imports: [
		SequelizeModule.forFeature([UserValueCategory, UserList, Category])
	],
	controllers: [UserValueCategoryController],
	providers: [UserValueCategoryService],
	exports: [UserValueCategoryService, SequelizeModule]
})
export class UserValueCategoryModule {}
