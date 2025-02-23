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

interface BookReviewCreationAttrs {
	review: string;
	note: string;
	bookId: number;
	userId: number;
}

@Table({ tableName: 'book_reviews' })
export class BookReview extends Model<BookReview, BookReviewCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => Book)
	@Column({ type: DataType.INTEGER })
	bookId: number;

	@BelongsTo(() => Book)
	book: Book;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@AllowNull(false)
	@Column({ type: DataType.STRING(500) })
	review: string;

	@AllowNull(false)
	@Column({ type: DataType.STRING(50) })
	note: string;
}
