require('dotenv').config();

const {MongoClient, ObjectId} = require('mongodb');
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const {BadRequestException} = require('../Exception');
const db_name = process.env.MONGODB_DB_NAME;


// const mongoose = require('mogoose');
// const url = "mongodb://localhost:27017/";
// const client = new MongoClient(url);

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
            const product = await database.collection(this.collection).findOne({"_id" : o_id})
            console.log(product);
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
            const result = await database.collection(this.collection).updateOne({"_id":new ObjectId(id)}, data);
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
            const result = await database.collection(this.collection).deleteOne(id);
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

module.exports = { Repository };