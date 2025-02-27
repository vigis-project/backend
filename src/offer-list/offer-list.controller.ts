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
import { OfferListService } from './offer-list.service';
import { CreateOfferListDto } from './dto/create-offer-list.dto';
import { UpdateOfferListDto } from './dto/update-offer-list.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('offers')
export class OfferListController {
	constructor(private readonly offerService: OfferListService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createOfferDto: CreateOfferListDto) {
		return this.offerService.createOffer(createOfferDto);
	}

	@Get()
	findAll() {
		return this.offerService.getAllOffers();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.offerService.getOfferById(+id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateOfferDto: UpdateOfferListDto
	) {
		return this.offerService.updateOffer(+id, updateOfferDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.offerService.deleteOffer(+id);
	}
}
