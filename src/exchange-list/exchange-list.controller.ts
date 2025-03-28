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
import { ExchangeListService } from './exchange-list.service';
import { CreateExchangeListDto } from './dto/create-exchange-list.dto';
import { UpdateExchangeListDto } from './dto/update-exchange-list.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('exchange')
export class ExchangeListController {
	constructor(private readonly exchangeService: ExchangeListService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createExchangeDto: CreateExchangeListDto) {
		return this.exchangeService.createExchange(createExchangeDto);
	}

	@Get()
	findAll() {
		return this.exchangeService.getAllExchanges();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.exchangeService.getExchangeById(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateExchangeDto: UpdateExchangeListDto
	) {
		return this.exchangeService.updateExchange(id, updateExchangeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.exchangeService.deleteExchange(id);
	}
}
