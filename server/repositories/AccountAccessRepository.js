const { Repository } = require('./Repository');

const { NotFoundException, BadRequestException, ConflictException } = require('../Exception');

const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const db_name = process.env.MONGODB_DB_NAME;

class SignInRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

    async SignIn(email) {
        const user = await this.getUser(email);
        if(!user)
            throw new NotFoundException("User not found");
        return [user.hashPassword, user.salt ];
    }

    async SignUp(user) {
        const userData = await this.getUser(user.email);
        console.log("userData: ", userData);
        if(userData)
            throw new ConflictException("User not found");
        this.insert(user);
        console.log("user password" + user.password);
    }

    async getUser(email) {
        try {
            await client.connect();
            const database = client.db(db_name);
            console.log("email: " + email + " collection " + this.collection);
            const user = await database.collection(this.collection).findOne({ "email": email })
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
module.exports = new SignInRepository('users');