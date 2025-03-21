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
    public getById(userId: string): Promise<IUser> {
        return User.findById(userId);
    }
    public updateById(userId: string, user: IUserUpdateDTO): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }
    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }
    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
    public bannedById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isBanned: true },
            { new: true },
        );
    }
    public unbannedById(userId: string): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isBanned: false },
            { new: true },
        );
    }
}

export const userRepository = new UserRepository();
