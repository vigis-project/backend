import { AutoIncrement, Column, DataType, Model, PrimaryKey, ForeignKey, BelongsTo, Table, Unique } from "sequelize-typescript";
import { User } from "./users.model";
import { UserAddressCreationAttrs } from "../types/user-address-creation-attrs.interface";

@Table({tableName: 'user_address'})
export class UserAddress extends Model<UserAddress, UserAddressCreationAttrs> {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER })
  id: number;

  @Unique
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  idUser: number;

  @Column({ type: DataType.STRING(6) })
  addrIndex: string;

  @Column({ type: DataType.STRING(35) })
  addrCity: string;

  @Column({ type: DataType.STRING(25) })
  addrStreet: string;

  @Column({ type: DataType.STRING(5) })
  addrHouse: string;

  @Column({ type: DataType.STRING(10) })
  addrStructure: string;

  @Column({ type: DataType.STRING(3) })
  addrApart: string;

  @Column({ type: DataType.BOOLEAN })
  isDefault: boolean;

  @BelongsTo(() => User)
  user: User;
}
