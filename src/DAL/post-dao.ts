import Post, { PostInput, PostOutput } from '@models/post.model';
import User from '@models/user.model';
import { log } from 'console';

async function getAll(): Promise<PostOutput[]> {
    return await Post.findAll() as PostOutput[];
}

async function getAllByUser(user: User): Promise<PostOutput[]> {
    return await user.$get('posts') as PostOutput[];
}




async function addOne(user: User, post: PostInput): Promise<PostOutput> {

    const postOut = await user.$create('post', post);
    log(postOut);
    return null as unknown as PostOutput;
}



async function updateOne(post: Post, newInfo: PostInput): Promise<PostOutput> {
    return await post.update(newInfo) as PostOutput;
}



async function deleteOne(id: number): Promise<void> {
    await Post.destroy({
        where: {
            id,
        },
    });
}
// Export defaul
export default {
    getAllByUser,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
