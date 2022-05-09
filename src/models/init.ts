import { Sequelize } from 'sequelize-typescript';
import User from './user.model';
import Post from './post.model';
import { Category, PostCategory } from './PostCategory.model';
const sequelize = new Sequelize({
    database: 'blog',
    dialect: 'mysql',
    username: 'root',
    password: '',
    storage: ':memory:',
    models: [User, Post, Category, PostCategory],
});


export default sequelize;