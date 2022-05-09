import User, { UserInput, UserOutput } from '@models/user.model';
import userDao from '@DAL/user-dao';
import { log } from 'console';




function getAll(): Promise<UserOutput[]> {
    return userDao.getAll();
}



function addOne(user: UserInput): Promise<UserOutput> {
    delete user.id;
    return userDao.addOne(user);
}


async function updateOne(user: UserInput): Promise<UserOutput> {
    const oldUser = await User.findByPk(user.id);
    if (!oldUser) {
        throw new Error('User not found');
    }
    return await userDao.updateOne(oldUser, user);
}



async function deleteOne(id: string): Promise<number> {
    return await userDao.delete(id);
}

async function getUserById(id: string): Promise<User | null> {
    return await userDao.getUserById(id);
}
async function getUserByEmail(email: string): Promise<User | null> {
    return await userDao.getUserByEmail(email);

}

// Export default
export default {
    getUserById,
    getUserByEmail,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
