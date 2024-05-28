const {Repository} = require('./Repository');

class SignInRepository extends Repository {

    constructor(collection) {
        super(collection);
    }

}
module.exports = new SignInRepository('SignIn');