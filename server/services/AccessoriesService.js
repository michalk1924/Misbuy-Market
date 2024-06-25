const {Service} = require('./Service.js');
const accessoriesRepository = require('../repositories/AccessoriesRepository.js');

class AccessoriesService extends Service {
    constructor(repositry) {
        super(repositry);
    }
}

module.exports = new AccessoriesService(accessoriesRepository);