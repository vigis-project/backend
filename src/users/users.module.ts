import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserAddressService } from './users-address.service';
import { UserAddress } from './models/user-address.model';

@Module({
	controllers: [UsersController],
	providers: [UsersService, UserAddressService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles, UserAddress]),
		RolesModule,
		forwardRef(() => AuthModule)
	],
	exports: [UsersService, UserAddressService]
})
export class UsersModule {}
