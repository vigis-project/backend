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

interface AuthorCreationAttrs {
	firstName: string;
	lastName: string;
}

@Table({ tableName: 'authors' })
export class Author extends Model<Author, AuthorCreationAttrs> {
	
	@Unique
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
