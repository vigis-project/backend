import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	AutoIncrement,
	HasMany,
	ForeignKey,
	BelongsTo
} from 'sequelize-typescript';
import { UserValueCategory } from 'src/user-value-category/models/user-value-category.model';

interface CategoryCreationAttrs {
	name: string;
	parentId?: number;
	multiSelect: boolean;
}

@Table({ tableName: 'category' })
export class Category extends Model<Category, CategoryCreationAttrs> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	categoryId: number;

	@Column({ type: DataType.STRING(25), allowNull: false, unique: true })
	name: string;

	@ForeignKey(() => Category)
	@Column({ type: DataType.INTEGER, allowNull: true })
	parentId?: number;

	@BelongsTo(() => Category, { foreignKey: 'parentId' })
	parentCategory?: Category;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	multiSelect: boolean;

	@HasMany(() => UserValueCategory)
	userValueCategories: UserValueCategory[];
}
