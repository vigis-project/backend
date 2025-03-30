export class CreateUserExchangeDto {
	readonly exchangeListId: number;
	readonly offerListId: number;
	readonly trackNumber: string;
	readonly receiving: boolean;
}
