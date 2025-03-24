import { IBase } from "./base.interface";

interface IUser extends IBase {
    email: string;
    password: string;
    role: string;
    isDelete: boolean;
    isVerified: boolean;
    _id: string;
    name: string;
    surname: string;
    age: number;
}

type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;

export type { IUser, IUserCreateDTO, IUserUpdateDTO };
