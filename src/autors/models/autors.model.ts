import {
	AllowNull,
	AutoIncrement,
	Column,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	Unique
} from 'sequelize-typescript';
import { Book } from 'src/books/models/books.model';

interface AutorCreationAttrs {
	firstName: string;
	lastName: string;
}

@Table({ tableName: 'autors' })
export class Autor extends Model<Autor, AutorCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@AllowNull(false)
	@Column({ type: DataType.STRING(20) })
	lastName: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING(20) })
	firstName: string;

	@HasMany(() => Book)
	books: Book[];
}
