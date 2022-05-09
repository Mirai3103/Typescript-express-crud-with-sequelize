import { Model, DataType, Column, HasMany, BeforeUpdate, BeforeCreate } from "sequelize-typescript";
import { Optional } from 'sequelize';
import { Table } from "sequelize-typescript";
import Post from "./post.model";
import { encryptPassword } from "@security/encrypt";
interface IUser {
    id: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type UserInput = Optional<IUser, "id">;
export type UserOutput = Required<IUser>;
@Table({
    timestamps: true,
})
class User extends Model<IUser, UserInput> implements IUser {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4
    })
    public id!: number;
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    public name!: string;
    @Column({
        type: DataType.STRING(50),
        allowNull: false
    })
    public email!: string;
    @Column({
        type: DataType.DATE,
        allowNull: true
    })
    public dateOfBirth!: Date;
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    public password!: string;
    @HasMany(() => Post)
    public posts!: Post[];
    @BeforeUpdate
    @BeforeCreate
    static makeUpperCase(instance: User) {
        instance.password = encryptPassword(instance.password);
    }


}
export default User;