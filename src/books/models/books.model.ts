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
import { Autor } from 'src/autors/models/autors.model';

interface BookCreationAttrs {
	bookName: string;
	note: string;
	autorId: number;
}

@Table({ tableName: 'books' })
export class Book extends Model<Book, BookCreationAttrs> {
	@Unique
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

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

	@ForeignKey(() => Autor)
	@Column({ type: DataType.INTEGER, allowNull: false })
	autorId: number;

	@BelongsTo(() => Autor)
	autor: Autor;
}
