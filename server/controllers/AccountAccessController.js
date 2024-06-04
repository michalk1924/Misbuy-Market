const { Exception, NotFoundException, InternalServerException, BadRequestException } = require("../Exception");
const AccountAccessService = require('../services/AccountAccessService');

class SignInController {

    constructor(service) {
        this.service = service;
    }

    async SignIn(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new BadRequestException("email or password not found");
            } 
            const token = await this.service.SignIn({ email: email, password: password});
            return res.status(200).send(token);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async SignUp(req, res) {
        try {
            const user = req.body;
            if (!user.email || !user.password) {
                throw new BadRequestException("email or password not found");
            } 
            const token = await this.service.SignUp(user);
            return res.status(200).json(token);
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

}

module.exports = new SignInController(AccountAccessService);