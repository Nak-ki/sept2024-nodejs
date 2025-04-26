import { IUser, IUserCreateDTO } from "../interfaces/user.interface";
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
    public updateById(userId: string, user: Partial<IUser>): Promise<IUser> {
        return User.findByIdAndUpdate(userId, user, { new: true });
    }
    public deleteById(userId: string): Promise<IUser> {
        return User.findByIdAndDelete(userId);
    }
    public getByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
    public bannedById(
        userId: string,
        dto: { isActive: boolean },
    ): Promise<IUser> {
        return User.findByIdAndUpdate(
            userId,
            { isActive: dto.isActive },
            { new: true },
        );
    }
    public updateAccountStatus(
        userId: string,
        isActive: { isActive: boolean },
    ): Promise<IUser> {
        return User.findByIdAndUpdate(userId, isActive, { new: true });
    }
}

export const userRepository = new UserRepository();
