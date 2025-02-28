import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
	Column,
	DataType,
	Default,
	HasMany,
	HasOne,
	Model,
	PrimaryKey,
	Table,
	Unique
} from 'sequelize-typescript';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { BookReview } from 'src/books/models/book-review.models';
import { UserAddress } from './user-address.model';

interface UserCreationAttrs {
	email: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	secondName: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@Unique
	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	email: string;

	@Unique
	@AllowNull(false)
	@Column({ type: DataType.STRING(25) })
	username: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING })
	password: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING(25) })
	firstName: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	lastName: string;

	@AllowNull(true)
	@Column({ type: DataType.STRING(25) })
	secondName: string;

	@Column({ type: DataType.INTEGER })
	rating: number;

	@Default(false)
	@Column({ type: DataType.BOOLEAN })
	enabled: boolean;

	@Default(false)
	@Column({ type: DataType.BOOLEAN })
	banned: boolean;

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[];

	@HasMany(() => BookReview)
	reviews: BookReview[];

	@HasOne(() => UserAddress)
	address: UserAddress;
}
