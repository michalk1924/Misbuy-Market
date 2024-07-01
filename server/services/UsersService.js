const { Exception, InternalServerException } = require('../Exception');
const { ObjectId } = require('mongodb');

const usersRepository = require('../repositories/UsersRepository');
const shoesService = require('../services/ShoesService');
const clothesService = require('../services/ClothesService');
const accessoriesService = require('../services/AccessoriesService');

class UsersService {

    constructor(repository) {
        this.repository = repository;
    }

    async getById(id) {
        try {
            const user = await this.repository.getById(id);
            if (!user)
                throw new Exception('User not found');
            return user;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async get(filter) {
        try {
            const user = await this.repository.get(filter);
            return user;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async update(id, data) {
        try {
            return this.repository.update(id, data);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async delete(id) {
        try {
            await this.repository.delete(id);
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async deleteAll() {
        try {
            return this.repository.deleteAll();
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async getUserItems(id)
    {
        try {
            const shoes = await shoesService.getAll({"userId": id});
            const accessories = await accessoriesService.getAll({"userId": id});
            const clothes = await clothesService.getAll({"userId": id});
            if (!Array.isArray(shoes) || !Array.isArray(accessories) || !Array.isArray(clothes)) {
                throw new Error("One of the repositories did not return an array");
            }
            let products = [];
            products = products.concat(shoes, accessories, clothes);
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            shuffleArray(products);
            return products;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

module.exports = new UsersService(usersRepository);;
