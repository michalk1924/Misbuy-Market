const {Controller} = require("./Controller");
const SignInService = require('../services/SignIn');

class SignInController extends Controller {
    constructor(service) {
        super(service)
    }
}

module.exports = new SignInController(SignInService);