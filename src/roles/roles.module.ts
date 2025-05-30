import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { User } from 'src/users/models/users.model';
import { UserRoles } from './user-roles.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	providers: [RolesService],
	controllers: [RolesController],
	imports: [SequelizeModule.forFeature([Role, User, UserRoles]), AuthModule],
	exports: [RolesService]
})
export class RolesModule {}
