import {
	Table,
	Column,
	Model,
	DataType,
	ForeignKey,
	BelongsTo,
	PrimaryKey,
	AutoIncrement
} from 'sequelize-typescript';
import { ExchangeList } from 'src/exchange-list/models/exchange-list.model';
import { OfferList } from 'src/offer-list/models/offer-list.model';

interface UserExchangeListCreationAttrs {
	exchangeListId: number;
	offerListId: number;
	trackNumber: string;
	receiving: boolean;
}

@Table({ tableName: 'user_exchange_list' })
export class UserExchangeList extends Model<
	UserExchangeList,
	UserExchangeListCreationAttrs
> {
	@PrimaryKey
	@AutoIncrement
	@Column({ type: DataType.INTEGER })
	id: number;

	@ForeignKey(() => ExchangeList)
	@Column({ type: DataType.INTEGER, allowNull: false })
	exchangeListId: number;

	@BelongsTo(() => ExchangeList)
	exchangeList: ExchangeList;

	@ForeignKey(() => OfferList)
	@Column({ type: DataType.INTEGER, allowNull: false })
	offerListId: number;

	@BelongsTo(() => OfferList)
	offerList: OfferList;

	@Column({ type: DataType.STRING(20), allowNull: false })
	trackNumber: string;

	@Column({ type: DataType.BOOLEAN, allowNull: false })
	receiving: boolean;
}
