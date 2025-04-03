import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService],
	imports: [SequelizeModule.forFeature([Category])],
	exports: [CategoryService]
})
export class CategoryModule {}
