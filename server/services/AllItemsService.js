const { Exception, InternalServerException, NotFoundException } = require('../Exception'); 4
const { Service } = require('./Service');
const shoesService = require('../services/ShoesService');
const accessoriesService = require('../services/AccessoriesService');
const clothesService = require('../services/ClothesService');
const shoesRepository = require('../repositories/ShoesRepository');
const accessoriesRepository = require('../repositories/AccessoriesRepository');
const clothesRepository = require('../repositories/ClothesRepository');

class AllItemsService extends Service {

    async get(id) {
        try {
            const cloth = await clothesService.get(id);
            if (cloth) {
                return cloth;
            }
            const shoes = await shoesService.get(id);
            if (shoes) {
                return shoes;
            }
            const accessoriesItem = await accessoriesService.get(id);
            if (accessoriesItem) {
                return accessoriesItem;
            }
            throw new NotFoundException("Item not found");
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async getAll(filter) {
        try {
            const shoes = await shoesService.getAll(filter);
            const accessories = await accessoriesService.getAll(filter);
            const clothes = await clothesService.getAll(filter);

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

        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async deleteAll() {
        try {
            const shoes = shoesRepository.deleteAll();
            const accessories = accessoriesRepository.deleteAll();
            const clothes = clothesRepository.deleteAll();
            const products = new Array();
            products.push(shoes);
            products.push(accessories);
            products.push(clothes);
            return products;
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

module.exports = new AllItemsService();