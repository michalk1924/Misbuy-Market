
const {Repository} = require('./Repository');

class BagsProductsRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new BagsProductsRepository('Bags');