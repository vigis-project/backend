import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
	CreatedAt,
	UpdatedAt
} from 'sequelize-typescript';
import { Book } from 'src/books/models/books.model';
import { User } from 'src/users/models/users.model';
//import { Status } from 'src/status/status.model';

interface OfferListCreationAttrs {
	bookId: number;
	userId: number;
	ISBN: string;
	yearPublishing: Date;
	//statusId: number;
}

@Table({ tableName: 'offer_list' })
export class OfferList extends Model<OfferList, OfferListCreationAttrs> {
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

	@Column({ type: DataType.STRING(13), allowNull: false })
	ISBN: string;

	@Column({ type: DataType.DATE, allowNull: false })
	yearPublishing: Date;

	/*@ForeignKey(() => Status)
	@Column({ type: DataType.INTEGER })
	statusId: number;

	@BelongsTo(() => Status)
	status: Status;*/
}
