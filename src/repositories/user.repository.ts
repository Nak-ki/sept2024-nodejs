import {IUser, IUserDTO} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository{
    public getAll():Promise<IUser[]>{
        return User.find()
    }

    public create(user:IUserDTO):Promise<IUser>{
        return User.create(user)
    }

    public getById(userId:string):Promise<IUser>{
        return User.findById(userId)
    }

    public updateById(userId:string, data: IUserDTO):Promise<IUser>{
        return User.findByIdAndUpdate(userId, data, {new:true})
    }

    public deleteById(userId:string):Promise<void>{
        return User.findByIdAndDelete(userId)
    }
}

export const userRepository = new UserRepository();