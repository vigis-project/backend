import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('authors')
export class AuthorsController {
	constructor(private readonly authorsService: AuthorsService) {}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	create(@Body() createAuthorDto: CreateAuthorDto) {
		return this.authorsService.createAuthor(createAuthorDto);
	}

	@Get()
	findAll() {
		return this.authorsService.getAllAuthors();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.authorsService.getAuthorById(+id);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
		return this.authorsService.updateAuthor(+id, updateAuthorDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.authorsService.deleteAuthor(+id);
	}
}
