
const { connect } = require('./connectMongoDB');
const { BadRequestException } = require('../Exception');
const { ObjectId } = require('mongodb');


class UsersRepository {

    constructor(collection) {
        this.collection = collection;
    }
    async getByUserId(id) {
        try {
            const database = await connect();
            let user = await database.collection(this.collection).findOne({"userId": id});
            return user;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    }
    
    async insert(data) {
        try {
            const database = await connect();
            const result = await database.collection(this.collection).insertOne(data);
            console.log("res Id:"+ result.insertedId);
            return result.insertedId;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    }

    async update(userId, data) {
        try {
            const database = await connect();
            const result = await database.collection(this.collection).updateOne({ "userId": userId }, { $set: data });
            return result;
        }
        catch (error) {
            error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
    }

}
module.exports = new UsersRepository('Passwords');