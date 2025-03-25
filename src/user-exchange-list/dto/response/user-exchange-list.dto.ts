import { UserExchangeList } from '../../models/user-exchange-list.model';
import { ExchangeList } from 'src/exchange-list/models/exchange-list.model';
import { OfferList } from 'src/offer-list/models/offer-list.model';

export class UserExchangeDtoResponse {
	id: number;
	exchangeList: ExchangeList;
	offerList: OfferList;
	trackNumber: string;
	receiving: boolean;

	constructor(userExchange: UserExchangeList) {
		this.id = userExchange.id;
		this.exchangeList = userExchange.exchangeList;
		this.offerList = userExchange.offerList;
		this.trackNumber = userExchange.trackNumber;
		this.receiving = userExchange.receiving;
	}

	static fromUserExchange(userExchange: UserExchangeList) {
		return new UserExchangeDtoResponse(userExchange);
	}
}
