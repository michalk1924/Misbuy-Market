require('dotenv').config();

const { Service } = require('./Service.js');
const AccountAccessRepository = require('../repositories/AccountAccessRepository');
const { Exception, UnauthorizedException, InternalServerException } = require('../Exception');

const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AccountAccessService {

    constructor(repo) {
        this.repository = repo;
    }

    async SignIn({ email, password }) {
        try {
            const [hashPassword, salt] = await this.repository.SignIn(email);
            const newHashPassword = await bcrypt.hash(password, salt);
            console.log("newHashPassword " + newHashPassword);
            const isMatch = hashPassword == newHashPassword;
            if (!isMatch) {
                throw new UnauthorizedException('worng password');
            }
            return "success";
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async SignUp(user) {
        try {
            const password = user.password;
            const saltRounds = 10 //process.env.SALT_RANDOM;
            console.log(saltRounds);
            const salt = await bcrypt.genSalt(saltRounds);
            console.log("salt: ", salt);
            const hashPassword = await bcrypt.hash(password, salt);
            console.log("hashPassword " + hashPassword);
            user.hashPassword = hashPassword;
            user.salt = salt;
            user.password = null;
            await this.repository.SignUp(user);
            return "success";
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

generateSalt = async () => {
    const saltLength = 16; // Adjust as needed
    const saltBuffer = await crypto.randomBytes(saltLength);
    const salt = saltBuffer.toString('hex');
    return salt;
}


module.exports = new AccountAccessService(AccountAccessRepository);