
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

class Repository {

    constructor(collection) {
        this.collection = collection;
    }

    async getAll(filter) {
        try {
            await client.connect();
            const database = client.db("mydb");
            const electricalProducts = await database.collection(this.collection).find(filter).toArray();
            console.log(electricalProducts);
            return electricalProducts;
        }
        catch (error) {
            throw error;
        }
        finally {
            await client.close();
        }
    };

    async get(id) {

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