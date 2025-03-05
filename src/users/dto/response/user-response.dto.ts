export class UserResponseDto {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly secondName: string;

	constructor(
		id: number,
		email: string,
		username: string,
		firstName: string,
		lastName: string,
		secondName: string
	) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.secondName = secondName;
	}
}
