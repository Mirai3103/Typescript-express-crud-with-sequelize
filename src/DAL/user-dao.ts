import User, { UserInput, UserOutput } from '@models/user.model';




async function getAll(): Promise<UserOutput[]> {
    const users = await User.findAll();
    return users as UserOutput[];
}



async function addOne(user: UserInput): Promise<UserOutput> {
    return (await User.create(user)) as UserOutput;
}


async function updateOne(user: User, newInfo: UserInput): Promise<UserOutput> {
    return await user.update(newInfo) as UserOutput;
}



async function deleteOne(id: string): Promise<number> {
    return await User.destroy({
        where: {
            id,
        },
    });
}

async function getUserById(id: string): Promise<User | null> {
    return await User.findByPk(id);
}
async function getUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({
        where: {
            email,
        },
    });
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
