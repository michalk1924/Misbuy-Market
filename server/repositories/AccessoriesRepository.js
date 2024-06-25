
const {Repository} = require('./Repository');

class AccessoriesRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new AccessoriesRepository('Accessories');