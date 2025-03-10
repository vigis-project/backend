import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from '@nestjs/common';
import { WishListService } from './wish-list.service';
import { CreateWishListDto } from './dto/create-wish-list.dto';
import { UpdateWishListDto } from './dto/update-wish-list.dto';

@Controller('wish-list')
export class WishListController {
	constructor(private readonly wishListService: WishListService) {}

	@Post()
	create(@Body() createWishListDto: CreateWishListDto) {
		return this.wishListService.createWishList(createWishListDto);
	}

	@Get()
	findAll() {
		return this.wishListService.getAllWishLists();
	}

	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.wishListService.getWishListById(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateWishListDto: UpdateWishListDto
	) {
		return this.wishListService.updateWishList(+id, updateWishListDto);
	}

	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.wishListService.deleteWishList(id);
	}
}
