import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Default, HasOne, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { UserAddress } from "./user-address.model";

interface UserCreationAttrs {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    secondName: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING(50) })
    email: string;

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING(20) })
    username: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING })
    password: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING(25) })
    firstName: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING(50) })
    lastName: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING(25) })
    secondName: string;

    @Column({type: DataType.INTEGER})
    rating: number;

    @Default(false)
    @Column({type: DataType.BOOLEAN})
    enabled: boolean;

    @Default(false)
    @Column({ type: DataType.BOOLEAN })
    banned: boolean;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[];

    @HasOne(() => UserAddress)
    address: UserAddress;
    user: import("../types/user-address-creation-attrs.interface").UserAddressCreationAttrs;
}
