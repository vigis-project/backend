import {
	AutoIncrement,
	Column,
	DataType,
	Model,
	PrimaryKey,
	ForeignKey,
	BelongsTo,
	Table,
	Unique
} from 'sequelize-typescript';
import { User } from './users.model';
import { UserAddressCreationAttrs } from '../types/user-address-creation-attrs.interface';

@Table({ tableName: 'user_address' })
export class UserAddress extends Model<UserAddress, UserAddressCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@Unique
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@Column({ type: DataType.STRING(6), allowNull: true })
	addrIndex?: string;

	@Column({ type: DataType.STRING(35), allowNull: true })
	addrCity?: string;

	@Column({ type: DataType.STRING(25), allowNull: true })
	addrStreet?: string;

	@Column({ type: DataType.STRING(5), allowNull: true })
	addrHouse?: string;

	@Column({ type: DataType.STRING(3), allowNull: true })
	addrStructure?: string;

	@Column({ type: DataType.STRING(5), allowNull: true })
	addrApart?: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	isDefault: boolean;

	@BelongsTo(() => User)
	user: User;
}
