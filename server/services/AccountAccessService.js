require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');
const AccountAccessRepository = require('../repositories/AccountAccessRepository');
const { Exception, UnauthorizedException, InternalServerException, BadRequestException } = require('../Exception');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const UsersRepository = require('../repositories/UsersRepository');
const passwordsRepository = require('../repositories/PasswordsRepository');

class AccountAccessService {

    constructor(repo) {
        this.repository = repo;
    }

    async signIn({ email, password }) {
        try {
            const user = await this.repository.SignIn(email);
            const userId = user._id;
            const userIdString = userId.toString();
            const { salt, hashPassword } = await passwordsRepository.getByUserId(userIdString)
            const newHashPassword = await bcrypt.hash(password, salt);
            const isMatch = hashPassword == newHashPassword;
            if (!isMatch) {
                throw new UnauthorizedException('worng password');
            }
            const tokenSecrete = process.env.TOKEN_SECRET;
            const token = jwt.sign({
                role: 'connected',
            }, tokenSecrete, {
                algorithm: 'HS256',
                expiresIn: '60m',
                issuer: 'my-api',
                subject: userIdString
            })
            return { user, token };
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async signUp(user) {
        try {
            const password = user.password;
            const salt = await bcrypt.genSalt(10);
            console.log("salt: ", salt);
            const hashPassword = await bcrypt.hash(password, salt);
            console.log("hashPassword " + hashPassword);
            delete user.password;
            delete user.verifyPassword;
            user.wishList = [];
            user.myProsuctsList = [];
            const userId = await this.repository.SignUp(user);
            const userIdString = userId.toString();
            const userPassword = {
                userId: userIdString,
                hashPassword: hashPassword,
                salt: salt,
            }
            await passwordsRepository.insert(userPassword)
            console.log("User Id: " + userIdString);
            const tokenSecrete = process.env.TOKEN_SECRET;
            const token = jwt.sign({
                role: 'connected',
            }, tokenSecrete, {
                algorithm: 'HS256',
                expiresIn: '60m',
                issuer: 'my-api',
                subject: userIdString,
            })
            return { token, userId: userIdString };
        }
        catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            let data = await fs.promises.readFile('./files/codes.txt', 'utf8');
            let lines = data.split('\n');
            let found = false;
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                let [existingEmail, existingCode] = line.split(':');
                if (existingEmail === email) {
                    lines[i] = `${email}:${code}`;
                    found = true;
                    break;
                }
            }
            if (!found) {
                lines.push(`${email}:${code}`);
            }
            await fs.promises.writeFile('./files/codes.txt', lines.join('\n'));
            await sendEmail(email, 'Here is your code', `Your code is: ${code}`);
            console.log('Password reset code sent successfully');
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException(error);
            throw error;
        }
    }

    async checkCodeFromEmail(email, code) {
        try {
            const data = await fs.promises.readFile('./files/codes.txt', 'utf8');
            const codes = data.split('\n').reduce((acc, line) => {
                if (line.trim()) { // מתעלמים משורות ריקות
                    const [mail, cd] = line.split(':');
                    acc[mail.trim()] = cd.trim();
                }
                return acc;
            }, {});

            const savedCode = codes[email];

            if (savedCode && savedCode == code) {
                console.log('code is correct');
                return true;
            } else {
                throw new BadRequestException('Invalid code');
            }
        } catch (error) {
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async newPassword(email, password) {
        try {
            console.log("password" + password);
            const saltRounds = 10 // process.env.SALT_ROUNDS;
            const salt = await bcrypt.genSalt(saltRounds);
            console.log("salt: ", salt);
            const hashPassword = await bcrypt.hash(password, salt);
            console.log("hashPassword " + hashPassword);
            const user = await UsersRepository.get({ "email": email })
            const userId = user._id;
            const userIdString = userId.toString();
            await passwordsRepository.update(userIdString, { "hashPassword": hashPassword, "salt": salt });
            console.log("User Id: " + userId);
            const tokenSecrete = process.env.TOKEN_SECRET;
            const token = jwt.sign({
                role: 'connected',
            }, tokenSecrete, {
                algorithm: 'HS256',
                expiresIn: '60m',
                issuer: 'my-api',
                subject: userId.toString(),
            })
            return { token, user_Id : userId};
        } catch (error) {
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

generateTokenSecret = () => {
    return crypto.randomBytes(32).toString('hex');
}

function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'misbuymarket@gmail.com',
            pass: 's c n j i j b c r n f t x s e n'
        }
    });

    let mailOptions = {
        from: 'misbuymarket@gmail.com',
        to: to,                      
        subject: subject,           
        text: text                    
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}

module.exports = new AccountAccessService(AccountAccessRepository);