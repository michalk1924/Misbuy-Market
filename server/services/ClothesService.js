const {Service} = require('./Service.js');
const clothesRepository = require('../repositories/ClothesRepository.js');

class ClothesService extends Service {
    constructor(repositry) {
        super(repositry);
    }
}

module.exports = new ClothesService(clothesRepository);