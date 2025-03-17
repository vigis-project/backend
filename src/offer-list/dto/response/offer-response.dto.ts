import { OfferList } from 'src/offer-list/models/offer-list.model';

export class OfferDtoResponse {
	id: number;
	bookId: number;
	userId: number;
	statusId: number;

	constructor(id: number, bookId: number, userId: number, statusId: number) {
		this.id = id;
		this.bookId = bookId;
		this.userId = userId;
		this.statusId = statusId;
	}

	static fromOfferList(offerList: OfferList) {
		return new OfferDtoResponse(
			offerList.id,
			offerList.bookId,
			offerList.userId,
			offerList.statusId
		);
	}
}
