const {Service} = require('./Service.js');
const electricalProductsRepository = require('../repositories/ElectricalProductsRepositry');

class StudentService extends Service {
    constructor(repo) {
        super(repo);
    }
}

module.exports = new StudentService(electricalProductsRepository);