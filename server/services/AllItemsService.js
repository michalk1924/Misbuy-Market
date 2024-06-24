const { Exception, InternalServerException, NotFoundException } = require('../Exception');4
const {Service} = require('./Service');
const shoesRepository = require('../repositories/ShoesRepository');
const bagsRepository = require('../repositories/BagsRepository');
const clothesRepository = require('../repositories/ClothesRepository');

// פונקציה לערבוב המערך
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class AllItemsService extends Service {

    async get(id) {
        try {
            await this.update(id, {"viewsCounter": ++this.viewsCounter});
            const shoes = await shoesRepository.get(id);
            if (shoes) return shoes;
            const bag = await bagsRepository.get(id);
            if (bag) return bag;
            const cloth = await clothesRepository.get(id);
            if (cloth) return cloth;
            throw new NotFoundException("Item not found");
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async getAll(filter) {
        try {
            const shoes = await shoesRepository.getAll(filter);
            const bags = await bagsRepository.getAll(filter);
            const clothes = await clothesRepository.getAll(filter);

            // לוודא שכל אחת מהקריאות מחזירה מערך
            if (!Array.isArray(shoes) || !Array.isArray(bags) || !Array.isArray(clothes)) {
                throw new Error("One of the repositories did not return an array");
            }

            let products = [];
            // צירוף המערכים למערך אחד
            products = products.concat(shoes, bags, clothes);

            // פונקציה לערבוב המערך
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            // ערבוב המערך
            shuffleArray(products);

            // החזרת המערך המעורבב
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
            const bags = bagsRepository.deleteAll();
            const clothes = clothesRepository.deleteAll();
            const products = new Array();
            products.push(shoes);
            products.push(bags);
            products.push(clothes);
            //לערבב את המערך
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