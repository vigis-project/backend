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
import { UserList } from 'src/user-list/models/user-list.model';
import { Category } from 'src/category/models/category.model';

interface UserValueCategoryCreationAttrs {
	idUserList: number;
	idCategory: number;
}

@Table({ tableName: 'user_value_category' })
export class UserValueCategory extends Model<
	UserValueCategory,
	UserValueCategoryCreationAttrs
> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	idUserValueCategory: number;

	@ForeignKey(() => UserList)
	@Column({ type: DataType.INTEGER })
	idUserList: number;

	@BelongsTo(() => UserList)
	userList: UserList;

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER })
	idCategory: number;

	@BelongsTo(() => Category)
	category: Category;
}
