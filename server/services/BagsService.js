const {Service} = require('./Service.js');
const bagsRepository = require('../repositories/BagsRepository.js');

class BagsService extends Service {
    constructor(repositry) {
        super(repositry);
    }
}

module.exports = new BagsService(bagsRepository);