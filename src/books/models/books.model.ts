import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	PrimaryKey,
	Table,
	Unique
} from 'sequelize-typescript';
import { BookReview } from './book-review.models';
import { Author } from 'src/authors/models/authors.model';

interface BookCreationAttrs {
	bookName: string;
	note: string;
	authorId: number;
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

	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	note: string;

	@AllowNull(false)
	@Column({ type: DataType.INTEGER, defaultValue: 0 })
	rating: number;

	@HasMany(() => BookReview)
	reviews: BookReview[];

	@ForeignKey(() => Author)
	@Column({ type: DataType.INTEGER, allowNull: false })
	authorId: number;

	@BelongsTo(() => Author)
	author: Author;
}
