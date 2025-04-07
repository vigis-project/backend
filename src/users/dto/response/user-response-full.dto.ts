import { User } from 'src/users/models/users.model';

export class UserResponseFullDto {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly firstName: string;
	readonly lastName: string;
	readonly secondName: string;
	readonly roles: string[];

	constructor(
		id: number,
		email: string,
		username: string,
		firstName: string,
		lastName: string,
		secondName: string,
		roles: string[]
	) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.secondName = secondName;
		this.roles = roles;
	}

	static fromUser(user: User) {
		return new UserResponseFullDto(
			user.id,
			user.email,
			user.username,
			user.firstName,
			user.lastName,
			user.secondName,
			user.roles?.map((role) => role.value) ?? []
		);
	}
}
