
import { Optional } from 'sequelize';
import User from "./user.model";
import { Category, PostCategory } from "./PostCategory.model";
import {
    BelongsTo, BelongsToMany
    , Column, DataType, ForeignKey, Table, Model
} from 'sequelize-typescript';
interface IPost {
    id?: number;
    title: string;
    content: string;
    userId?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

}

export type PostInput = Optional<IPost, "id">;
export type PostOutput = Required<IPost>;
@Table({
    timestamps: true,
})
class Post extends Model<IPost, PostInput> implements IPost {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    public id!: number;
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    public title!: string;
    @Column({
        type: DataType.TEXT,
        allowNull: false
    })
    public content!: string;
    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    public userId!: number;
    @BelongsTo(() => User)
    public user!: User;
    @BelongsToMany(() => Category, () => PostCategory)
    public categories!: Category[];
}
export default Post;