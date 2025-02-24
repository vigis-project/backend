import {
	AllowNull,
	AutoIncrement,
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	Unique
} from 'sequelize-typescript';
import { BookReview } from './book-review.models';

interface BookCreationAttrs {
	bookName: string;
	note: string;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@Unique
	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	bookName: string;

	@Unique
	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	note: string;

	@Column({ type: DataType.INTEGER })
	rating: number;

	@HasMany(() => BookReview)
	responese: BookReview;
}
