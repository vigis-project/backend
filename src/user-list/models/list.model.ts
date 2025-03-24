import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserList } from 'src/user-list/models/user-list.model';

@Table({ tableName: 'lists' })
export class List extends Model<List> {
	@Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
	id: number;

	@Column({ type: DataType.STRING, allowNull: false })
	name: string;

	@HasMany(() => UserList)
	userLists: UserList[];
}
