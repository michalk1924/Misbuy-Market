
const {Repository} = require('./Repository');

class ElectricalProductsRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new ElectricalProductsRepository('electricalProducts');