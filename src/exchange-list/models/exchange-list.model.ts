import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement,
	CreatedAt
} from 'sequelize-typescript';
import { OfferList } from 'src/offer-list/models/offer-list.model';
import { WishList } from 'src/wish-list/models/wish-list.model';

interface ExchangeListCreationAttrs {
	offerList1Id: number;
	wishList1Id: number;
	offerList2Id: number;
	wishList2Id: number;
	isBoth: boolean;
}

@Table({ tableName: 'exchange_list' })
export class ExchangeList extends Model<
	ExchangeList,
	ExchangeListCreationAttrs
> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => OfferList)
	@Column({ type: DataType.INTEGER })
	offerList1Id: number;

	@BelongsTo(() => OfferList, { foreignKey: 'offerList1Id' })
	offerList1: OfferList;

	@ForeignKey(() => WishList)
	@Column({ type: DataType.INTEGER })
	wishList1Id: number;

	@BelongsTo(() => WishList, { foreignKey: 'wishList1Id' })
	wishList1: WishList;

	@ForeignKey(() => OfferList)
	@Column({ type: DataType.INTEGER })
	offerList2Id: number;

	@BelongsTo(() => OfferList, { foreignKey: 'offerList2Id' })
	offerList2: OfferList;

	@ForeignKey(() => WishList)
	@Column({ type: DataType.INTEGER })
	wishList2Id: number;

	@BelongsTo(() => WishList, { foreignKey: 'wishList2Id' })
	wishList2: WishList;

	@CreatedAt
	@Column({ type: DataType.DATE })
	createdAt: Date;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	isBoth: boolean;
}
