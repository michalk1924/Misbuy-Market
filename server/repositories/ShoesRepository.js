
const {Repository} = require('./Repository');

class ShoesRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new ShoesRepository('Shoes');