const {Service} = require('./Service.js');
const electricalProductsRepository = require('../repositories/ElectricalProductsRepositry');

class StudentService extends Service {
    constructor(repositry) {
        super(repositry);
    }
}

module.exports = new StudentService(electricalProductsRepository);