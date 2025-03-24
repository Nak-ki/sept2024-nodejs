import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }

    public updateById(userId: string, data: IUserUpdateDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, data, { new: true });
    }

    public deleteById(userId: string): Promise<void> {
        return User.findByIdAndDelete(userId);
    }

    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
}

export const userRepository = new UserRepository();
