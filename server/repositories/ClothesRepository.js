
const {Repository} = require('./Repository');

class ClothesRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new ClothesRepository('Clothes');