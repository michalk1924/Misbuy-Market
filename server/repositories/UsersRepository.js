require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const { BadRequestException, NotFoundException, Exception } = require('../Exception');
const { error } = require('console');
const db_name = process.env.MONGODB_DB_NAME;

class UsersRepository {

    async get(id) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const o_id = new ObjectId(id);
            let user = await database.collection(this.collection).findOne({ "_id": o_id })
            return user;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    };

}
module.exports = new UsersRepository();