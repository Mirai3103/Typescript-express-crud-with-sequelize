import bcrypt from 'bcrypt';
const saltRounds = 10;

export const encryptPassword = (password: string): string => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}

export const comparePassword = (rawPassword: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(rawPassword, hashPassword);
}
