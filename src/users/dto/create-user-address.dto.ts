// TODO: Сделать поля, связанные с квартирой (addrApart)/номером строения (addrStructure) не обязательными

export class CreateUserAddressDto {
	readonly addrIndex: string;
	readonly addrCity: string;
	readonly addrStreet: string;
	readonly addrHouse: string;
	readonly addrStructure: string;
	readonly addrApart: string;
	readonly idUser: number;
}
