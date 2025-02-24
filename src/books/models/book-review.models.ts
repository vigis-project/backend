import {
	AllowNull,
	AutoIncrement,
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
	createAt: string;
	response: string;
	note: string;
}

@Table({ tableName: 'book_review' })
export class BookReview extends Model<Book, BookReviewCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => Book)
	@Column({ type: DataType.INTEGER })
	idBook: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	idUser: number;

	@Column({ type: DataType.STRING(500) })
	response: string;

	@Column({ type: DataType.STRING(50) })
	note: string;
}
