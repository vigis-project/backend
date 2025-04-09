import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript';

interface StatusCreationAttrs {
	name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@Column({ type: DataType.STRING(20), allowNull: false })
	name: string;
}
