require('dotenv').config();
const fs = require('fs');

const converters=require('../converters');

const url = process.env.MONGODB_URL;
const db_name = process.env.MONGODB_DB_NAME;

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient(url);
const { BadRequestException, NotFoundException, Exception } = require('../Exception');


class Repository {

    constructor(collection) {
        this.collection = collection;
    }

    async getAll(filter) {
        try {
            await client.connect();
            const database = client.db(db_name);
            const products = await database.collection(this.collection).find(filter).toArray();
            // products.forEach(async product => {
            //     const {imageUrl,...productWithoutImg}=product;
            //     console.log(imageUrl, productWithoutImg);
            //     const img=converters.convertUrlToImage(imageUrl);
            //     return({...productWithoutImg, image:img});


                // const image = await getImage(product.imageUrl);
                // console.log("i" + image[5]);
                // product.image = image;
            // });
            console.log("products" + products);
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
            const product = await database.collection(this.collection).findOne({ "_id": o_id })
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
            return result.insertedId.toString();
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
            const result = await database.collection(this.collection).updateOne({ "_id": o_id }, data);
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
            const result = await database.collection(this.collection).deleteOne({ _id: o_id });
            if (result.deletedCount === 0) {
                throw new NotFoundException();
            }
        }
        catch (error) {
            if(!error instanceof Exception)
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
            if(!error instanceof Exception)
                error = new BadRequestException("Repository Error: " + error.message);
            throw error;
        }
        finally {
            await client.close();
        }
    }
    
}

module.exports = { Repository };