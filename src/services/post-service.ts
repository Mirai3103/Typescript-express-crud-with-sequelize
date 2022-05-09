import Post, { PostInput, PostOutput } from '@models/post.model';
import User from '@models/user.model';
import userService from "./user-service"
import postDao from '@DAL/post-dao';
import { UserNotFoundError } from '@shared/errors';
import { log } from 'console';


async function getAll(): Promise<PostOutput[]> {
    return await postDao.getAll();
}

async function getAllByUser(userId: string): Promise<PostOutput[]> {
    const user = await userService.getUserById(userId);
    if (!user) {
        throw new UserNotFoundError();
    }
    return await postDao.getAllByUser(user);
}




async function addOne(userId: string, post: PostInput): Promise<PostOutput> {
    const user: User | null = await userService.getUserById(userId);
    if (user === null) {
        throw new UserNotFoundError();
    }
    log(user)
    return await postDao.addOne(user, post);
}



async function updateOne(post: PostInput): Promise<PostOutput> {
    const oldPost = await Post.findByPk(post.id);
    if (!oldPost) {
        throw new Error('Post not found');
    }
    return postDao.updateOne(oldPost, post);
}



async function deleteOne(id: number): Promise<void> {
    await postDao.delete(id);
}


// Export default
export default {
    getAllByUser,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
