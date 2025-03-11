import {IUser, IUserDTO} from "../interfaces/user.interface";
import {userRepository} from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll()
    }

    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user)
    }

    public getById(userId: string): Promise<IUserDTO> {
        return userRepository.getById(userId)
    }

    public updateById(userId: string, data: IUserDTO): Promise<IUserDTO> {
        return userRepository.updateById(userId, data)
    }

    public async deleteById(userId: string): Promise<void> {
         await userRepository.deleteById(userId)
    }
}

export const userService = new UserService();