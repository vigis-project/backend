import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Author } from './models/authors.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [AuthorsController],
	providers: [AuthorsService],
	imports: [SequelizeModule.forFeature([Author]), RolesModule, AuthModule],
	exports: [AuthorsService]
})
export class AuthorsModule {}
