import { PartialType } from '@nestjs/swagger';
import { CreateUserListDto } from './create-user-list.dto';

export class UpdateUserListDto extends PartialType(CreateUserListDto) {}
