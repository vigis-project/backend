import { Module } from '@nestjs/common';
import { AutorsService } from './autors.service';
import { AutorsController } from './autors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Autor } from './models/autors.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	controllers: [AutorsController],
	providers: [AutorsService],
	imports: [SequelizeModule.forFeature([Autor]), RolesModule, AuthModule],
	exports: [AutorsService]
})
export class AutorsModule {}
