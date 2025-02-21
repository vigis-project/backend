import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Default, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs {
    email: string;
    password: string;
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
    @Column({ type: DataType.STRING(15) })
    email: string;

    @Unique
    @AllowNull(false)
    @Column({ type: DataType.STRING(20) })
    username: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING(15) })
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
}
