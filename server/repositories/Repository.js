require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const {BadRequestException} = require('../Exception');

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
            const database = client.db("mydb");
            const products = await database.collection(this.collection).find(filter).toArray();
            return products;
        }
        catch (error) {
            throw error;
        }
        finally {
            await client.close();
        }
    };

    async get(id) {
        try {
            await client.connect();
            const database = client.db("mydb");
            const product = await database.collection(this.collection).findOne({name: id});
            return product;
        }
        catch (error) {
            throw new BadRequestException(error);
        }
        finally {
            await client.close();
        }
    }

    async insert(data) {
        try {
            await client.connect();
            const database = client.db("mydb");
            const result = await database.collection(this.collection).insertOne(data);
            return result.insertedId;
        }
        catch (error) {
            throw error;
        }
        finally {
            await client.close();
        }
    }

    async update(id, data) {

    }

    async delete(id) {

    }
}

module.exports = { Repository };