
const { NotFoundException, BadRequestException, ConflictException } = require('../Exception');

const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const db_name = process.env.MONGODB_DB_NAME;

const usersRepository = require('../repositories/UsersRepository');

class AccountAccessRipository {

    async SignIn(email) {
        const user = await usersRepository.get({ "email": email });
        if (!user)
            throw new NotFoundException("User not found");
        return user;
    }

    async SignUp(user) {
        const userData = await usersRepository.get({ "email": user.email }); //use(user.email)//
        if (userData != null)
            throw new ConflictException("User exists");
        const userId = await usersRepository.insert(user);
        return userId;
    }

}
module.exports = new AccountAccessRipository();