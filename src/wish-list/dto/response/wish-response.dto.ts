import { WishList } from 'src/wish-list/models/wish-list.model';

export class WishDtoResponse {
	id: number;
	userId: number;
	statusId: number;
	userAddressId: number;

	constructor(
		id: number,
		userId: number,
		statusId: number,
		userAddressId: number
	) {
		this.id = id;
		this.userId = userId;
		this.statusId = statusId;
		this.userAddressId = userAddressId;
	}

	static fromWishList(wishList: WishList) {
		return new WishDtoResponse(
			wishList.id,
			wishList.userId,
			wishList.statusId,
			wishList.userAddressId
		);
	}
}
