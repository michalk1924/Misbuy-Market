
const { NotFoundException, BadRequestException, ConflictException } = require('../Exception');

const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const db_name = process.env.MONGODB_DB_NAME;

const usersRepository = require('../repositories/UsersRepository');

class AccountAccessRipository {

    async SignIn(email) {
        const user = await this.getUser(email);
        if(!user)
            throw new NotFoundException("User not found");
        return user;
    }

    async SignUp(user) {
        const userData = await this.getUser(user.email);
        if(userData)
            throw new ConflictException("User exists");
        const userId = usersRepository.insert(user);
        console.log("userid" + userId);
        return userId;
    }

    async getUser(email) {
        try {
            await client.connect();
            const database = client.db(db_name);
            //console.log("email: " + email + " collection " + this.collection);
            const user = await database.collection('Users').findOne({ "email": email })
            return user;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;;
        }
        finally {
            await client.close();
        }
    }

}
module.exports = new AccountAccessRipository();