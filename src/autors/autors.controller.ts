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
import { AutorsService } from './autors.service';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('autors')
export class AutorsController {
	constructor(private readonly autorsService: AutorsService) {}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	create(@Body() createAutorDto: CreateAutorDto) {
		return this.autorsService.createAutor(createAutorDto);
	}

	@Get()
	findAll() {
		return this.autorsService.getAllAutors();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.autorsService.getAutorById(+id);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAutorDto: UpdateAutorDto) {
		return this.autorsService.updateAutor(+id, updateAutorDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.autorsService.deleteAutor(+id);
	}
}
