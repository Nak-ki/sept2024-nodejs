const {read, write} = require("../services/fs.service");

class UserRepository {
    async getAll() {
        return read()
    }

    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age
        }
        users.push(newUser)
        await write(users)
        return newUser
    }

    async getById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index]
    }

    async update(id, data) {
        const users = await read();
        const user = await this.getById(id)
        const index = users.findIndex(user => user.id === Number(id));
        if (user.name !== data.name && user.name.length >= 3) {
            user.name = data.name;
        }
        if (user.surname !== data.surname && user.surname.length >= 3) {
            user.surname = data.surname;
        }
        if (user.age !== data.age && user.age >= 18) {
            user.age = data.age;
        }
        users[index] = user;
        await write(users)
        return user;
    }

    async delete(id) {
        const users = await read();
        const user = await this.getById(id);
        const index = users.findIndex(user => user.id === Number(id));
        if (!user) {
            throw new Error('User does not exist');
        }
        users.splice(index, 1);
        await write(users)

    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}