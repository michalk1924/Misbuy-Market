
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

class Repository {

    constructor(collection) {
        this.collection = collection;
    }

    async getAll() {
        try {
            await client.connect();

            const database = client.db("mydb");
            const electricalProducts = await database.collection(this.collection).find().toArray();
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

    }

    async update(id, data) {

    }

    async delete(id) {

    }
}

module.exports = { Repository };