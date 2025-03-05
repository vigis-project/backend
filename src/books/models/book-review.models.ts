import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	PrimaryKey,
	Table,
	Unique
} from 'sequelize-typescript';
import { Book } from './books.model';
import { User } from 'src/users/models/users.model';
import { BookReviewCreationAttrs } from '../types/book-review-creation-attrs.interface';

@Table({ tableName: 'book_reviews' })
export class BookReview extends Model<Book, BookReviewCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@AllowNull(false)
	@ForeignKey(() => Book)
	@Column({ type: DataType.INTEGER })
	bookId: number;

	@AllowNull(false)
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@AllowNull(false)
	@Column({ type: DataType.STRING(500) })
	review: string;

	@Column({ type: DataType.STRING(50) })
	note: string;

	@BelongsTo(() => User)
	user: User;

	@BelongsTo(() => Book)
	book: Book;
}
