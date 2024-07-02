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
    async getById(id) {
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
    }

    async getAll(filter) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const users = await database.collection(this.collection).find(filter).toArray();
            return users;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    };

    async get(filter) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const user = await database.collection(this.collection).findOne(filter);
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

    async insert(data) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const result = await database.collection(this.collection).insertOne(data);
            console.log("res Id:" + result.insertedId);
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

    async update(id, data) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const o_id = new ObjectId(id);
            const result = await database.collection(this.collection).updateOne({ "_id": o_id }, { $set: data });
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
module.exports = new UsersRepository('Users');