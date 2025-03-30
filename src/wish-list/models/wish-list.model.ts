import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	UpdatedAt
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Status } from 'src/status/models/status.model';
import { UserAddress } from 'src/users/models/user-address.model';

interface WishListCreationAttrs {
	userId: number;
	statusId: number;
	userAddressId: number;
}

@Table({ tableName: 'wish_list' })
export class WishList extends Model<WishList, WishListCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER, allowNull: false })
	statusId: number;

	@BelongsTo(() => Status)
	status: Status;

	@ForeignKey(() => UserAddress)
	@Column({ type: DataType.INTEGER, allowNull: false })
	userAddressId: number;

	@BelongsTo(() => UserAddress)
	userAddress: UserAddress;
}
