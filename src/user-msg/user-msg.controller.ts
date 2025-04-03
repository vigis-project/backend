import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	NotFoundException
} from '@nestjs/common';
import { UserMsgService } from './user-msg.service';
import { CreateUserMsgDto } from './dto/create-user-msg.dto';
import { UpdateUserMsgDto } from './dto/update-user-msg.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserMsgDtoResponse } from './dto/response/user-msg-response.dto';

@Controller('user-msg')
export class UserMsgController {
	constructor(private readonly userMsgService: UserMsgService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	async create(@Body() createUserMsgDto: CreateUserMsgDto) {
		const userMsg = await this.userMsgService.create(createUserMsgDto);
		return UserMsgDtoResponse.fromUserMsg(userMsg);
	}

	@Get()
	async findAll() {
		const userMsgs = await this.userMsgService.getAll();
		return userMsgs.map(UserMsgDtoResponse.fromUserMsg);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const userMsg = await this.userMsgService.getById(+id);
		if (userMsg) {
			return UserMsgDtoResponse.fromUserMsg(userMsg);
		}
		throw new NotFoundException(`UserMsg with id = ${id} not found`);
	}

	@Patch(':id')
	async update(
		@Param('id') id: string,
		@Body() updateUserMsgDto: UpdateUserMsgDto
	) {
		const updatedUserMsg = await this.userMsgService.update(
			+id,
			updateUserMsgDto
		);
		if (!updatedUserMsg) {
			throw new NotFoundException(`UserMsg with id = ${id} not found`);
		}
		return UserMsgDtoResponse.fromUserMsg(updatedUserMsg);
	}

	@Delete(':id')
	async remove(@Param('id') id: string) {
		return this.userMsgService.delete(+id);
	}
}
