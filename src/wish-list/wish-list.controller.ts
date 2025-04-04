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
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';
import { Roles } from 'src/roles/roles-auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { WishList } from './models/wish-list.model';
import { WishDtoResponse } from './dto/response/wish-response.dto';

@Controller('wish-list')
export class WishListController {
	constructor(private readonly wishListService: WishListService) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	create(@Body() createWishListDto: CreateWishListDto) {
		return this.wishListService.createWishList(createWishListDto);
	}

	@Get()
	async findAll() {
		const wishes: WishList[] = await this.wishListService.getAllWishLists();
		return wishes.map(WishDtoResponse.fromWishList);
	}

	@Get(':id')
	async findOne(@Param('id') id: string) {
		const wishList = await this.wishListService.getWishListById(+id);
		if (wishList) {
			return WishDtoResponse.fromWishList(wishList);
		}
		throw new NotFoundException(`Wish List with id = ${id} not found`);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateWishListDto: UpdateWishListDto
	) {
		return this.wishListService.updateWishList(+id, updateWishListDto);
	}

	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.wishListService.deleteWishList(+id);
	}
}
