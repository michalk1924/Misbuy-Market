
const { BadRequestException, NotFoundException, Exception } = require('../Exception');
const { connect } = require('./connectMongoDB');
const { ObjectId } = require('mongodb');


class Repository {

    constructor(collection) {
        this.collection = collection;
    }

    async getAll(filter) {
        try {
            const database = await connect();
            const products = await database.collection(this.collection).find(filter).toArray();
            return products;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    };

    async get(id) {
        try {
            const database = await connect();
            const o_id = new ObjectId(id);
            let product = await database.collection(this.collection).findOne({ "_id": o_id })
            return product;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;;
        }
    }

    async insert(data) {
        try {
            const database = await connect();
            const result = await database.collection(this.collection).insertOne(data);
            console.log("res Id:" + result.insertedId);
            return result.insertedId;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const database = await connect();
            const o_id = new ObjectId(id);
            const result = await database.collection(this.collection).updateOne({ "_id": o_id }, { $set: data });
            return result;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const database = await connect();
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
    }

    async deleteAll() {
        try {
            const database = await connect();
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
    }

}

module.exports = { Repository };