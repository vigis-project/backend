export class AuthorResponseDto {
	id: number;
	firstName: string;
	lastName: string;

	constructor(id: number, firstName: string, lastName: string) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
