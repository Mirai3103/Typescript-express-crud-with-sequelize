interface IUser {
    id: number;
    name: string;
    email: string;
    dateOfBirth: Date;
    password: string;
}

const user: Object = {
    id: 1,
    name: "John",
    email: "huu@.cc"
}

const tester = user as IUser;
console.log(tester);
