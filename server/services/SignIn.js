const {Service} = require('./Service.js');
const SignInRepository = require('../repositories/SignInRepository');

class SignInService extends Service {
    constructor(repo) {
        super(repo);
    }
}

module.exports = new SignInService(SignInRepository);