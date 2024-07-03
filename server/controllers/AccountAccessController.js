const { Exception, NotFoundException, InternalServerException, BadRequestException } = require("../Exception");
const AccountAccessService = require('../services/AccountAccessService');

class SignInController {

    constructor(service) {
        this.service = service;
    }

    async signIn(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw new BadRequestException("email or password not found");
            }
            const {user, token} = await this.service.signIn({ email: email, password: password });
            return res.status(200).send({user, token});
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async signUp(req, res) {
        try {
            const userData = req.body;
            if (!userData.email || !userData.password) {
                throw new BadRequestException("email or password not found");
            }
            const {userId, token} = await this.service.signUp(userData);
            return res.status(200).json({userId, token});
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                throw new BadRequestException("email not found");
            }
            await this.service.forgotPassword(email);
            return res.status(200).end();
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async checkCodeFromEmail(req, res) {
        try {
            const { email, code } = req.body;
            if (!email || !code) {
                throw new BadRequestException("email or code not found");
            }
            const result = await this.service.checkCodeFromEmail(email, code);
            if (result) return res.status(200).end();
            else throw new BadRequestException("Invalid email or code");
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }

    async newPassword(req, res) {
        try {
            const { email, password } = req.body;
            if (!password) {
                throw new BadRequestException("new password not found");
            }
            const {token, user_Id} = await this.service.newPassword(email, password);
            return res.status(200).json({token, user_Id});
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            console.log(error.message);
            return res.status(error.statusCode || 500).json(error.message);
        }
    }
}

module.exports = new SignInController(AccountAccessService);