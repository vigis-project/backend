import { ExchangeList } from 'src/exchange-list/models/exchange-list.model';

export class ExchangeDtoResponse {
	id: number;
	offerList1Id: number;
	wishList1Id: number;
	offerList2Id: number;
	wishList2Id: number;

	constructor(
		id: number,
		offerList1Id: number,
		wishList1Id: number,
		offerList2Id: number,
		wishList2Id: number
	) {
		this.id = id;
		this.offerList1Id = offerList1Id;
		this.wishList1Id = wishList1Id;
		this.offerList2Id = offerList2Id;
		this.wishList2Id = wishList2Id;
	}

	static fromExchangeList(exchange: ExchangeList): ExchangeDtoResponse {
		return new ExchangeDtoResponse(
			exchange.id,
			exchange.offerList1Id,
			exchange.wishList1Id,
			exchange.offerList2Id,
			exchange.wishList2Id
		);
	}
}
