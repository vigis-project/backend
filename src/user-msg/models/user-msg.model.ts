import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript';
import { User } from 'src/users/models/users.model';
import { Status } from 'src/status/models/status.model';

interface UserMsgCreationAttrs {
	userId: number;
	text: string;
	notes: string;
	statusId: number;
	type: number;
}

@Table({ tableName: 'user_msg' })
export class UserMsg extends Model<UserMsg, UserMsgCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@Column({ type: DataType.STRING(250), allowNull: false })
	text: string;

	@Column({ type: DataType.STRING(150), allowNull: true })
	notes: string;

	@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	statusId: number;

	@Column({ type: DataType.INTEGER, allowNull: false })
	type: number;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Status)
	status: Status;
}
