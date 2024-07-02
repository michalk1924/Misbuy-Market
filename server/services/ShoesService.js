const { Service } = require('./Service.js');
const shoesServiceRepository = require('../repositories/ShoesRepository.js');

class ShoesService extends Service {
    constructor(repositry) {
        super(repositry);
    }
}

module.exports = new ShoesService(shoesServiceRepository);