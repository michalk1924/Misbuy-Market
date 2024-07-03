require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const { BadRequestException, NotFoundException, Exception } = require('../Exception');
const db_name = process.env.MONGODB_DB_NAME;

class Repository {

    constructor(collection) {
        this.collection = collection;
    }

    async getAll(filter) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const products = await database.collection(this.collection).find(filter).toArray();
            return products;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    };

    async get(id) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const o_id = new ObjectId(id);
            let product = await database.collection(this.collection).findOne({ "_id": o_id })
            return product;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;;
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

    async delete(id) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const o_id = new ObjectId(id);
            const result = await database.collection(this.collection).findOneAndDelete({ _id: o_id });
            if (result == null) {
                throw new NotFoundException();
            }
            return result;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }

    async deleteAll() {
        try {
            await client.connect();
            const database = client.db(db_name);
            const result = await database.collection(this.collection).deleteMany({});
            if (result.deletedCount === 0) {
                throw new NotFoundException();
            }
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }

}

module.exports = { Repository };