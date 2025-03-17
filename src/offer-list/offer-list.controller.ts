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
import { OfferListService } from './offer-list.service';
import { CreateOfferListDto } from './dto/create-offer-list.dto';
import { UpdateOfferListDto } from './dto/update-offer-list.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OfferList } from './models/offer-list.model';
import { OfferDtoResponse } from './dto/response/offer-response.dto';

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
	async findOne(@Param('id') id: string) {
		const offerList = await this.offerService.getOfferById(+id);
		if (offerList) {
			return OfferDtoResponse.fromOfferList(offerList);
		}
		throw new NotFoundException(`Offer List with id = ${id} not found`);
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
