import { AllowNull, AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
    value: string;
    description: string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, RoleCreationAttrs> {
    
    @Unique
    @PrimaryKey
    @AutoIncrement
    @Column({type: DataType.INTEGER})
    id: number;

    @Unique
    @AllowNull(false)
    @Column({type: DataType.STRING})
    value: string;

    @AllowNull(false)
    @Column({type: DataType.STRING})
    description: string;

    @BelongsToMany(()=> User, ()=> UserRoles)
    users: User[];
}