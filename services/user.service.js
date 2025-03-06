const {userRepository} = require("../repositories/user.repository");

class UserService {
    async getAll() {
        return await userRepository.getAll()
    }

    async create(user) {
        return await userRepository.create(user)
    }
    async getById(id){
        return await userRepository.getById(id)
    }
    async update(id, data){
        return await userRepository.update(id, data)
    }
    async delete(id){
        await userRepository.delete(id)
    }
}

const userService = new UserService();

module.exports = {
    userService
}