require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const { BadRequestException, NotFoundException, Exception } = require('../Exception');
const db_name = process.env.MONGODB_DB_NAME;

class UsersRepository {

    constructor(collection) {
        this.collection = collection;
    }
    async getByUserId(id) {
        try {
            await client.connect();
            const database = client.db(db_name);
            let user = await database.collection(this.collection).findOne({"userId": id});
            return user;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }
    
    async insert(data) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const result = await database.collection(this.collection).insertOne(data);
            console.log("res Id:"+ result.insertedId);
            return result.insertedId;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }

    async update(userId, data) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const result = await database.collection(this.collection).updateOne({ "userId": userId }, { $set: data });
            return result;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }

}
module.exports = new UsersRepository('Passwords');