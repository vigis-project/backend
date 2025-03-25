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
import { List } from './list.model';
import { TypeList } from './type-list.model';

interface UserListCreationAttrs {
	typeListId: number;
	listId: number;
}

@Table({ tableName: 'user_list' })
export class UserList extends Model<UserList, UserListCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => TypeList)
	@Column({ type: DataType.INTEGER, allowNull: false })
	typeListId: number;

	@BelongsTo(() => TypeList)
	typeList: TypeList;

	@ForeignKey(() => List)
	@Column({ type: DataType.INTEGER, allowNull: false })
	listId: number;

	@BelongsTo(() => List)
	list: List;
}
