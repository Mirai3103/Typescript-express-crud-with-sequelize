import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Post from "./post.model";



@Table({
    timestamps: false,
})
export class Category extends Model {
    @Column({
        allowNull: false,
        primaryKey: true,
        type: DataType.INTEGER
    })
    id!: number;
    @Column({
        allowNull: false,
        type: DataType.STRING(255)
    })
    name!: string;
    @BelongsToMany(() => Post, () => PostCategory)
    post!: Post[]
}
@Table({
    timestamps: false,
})
export class PostCategory extends Model {
    @ForeignKey(() => Post)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    postId!: number;

    @ForeignKey(() => Category)
    @Column({
        allowNull: false,
        type: DataType.INTEGER
    })
    categoryId!: number
}