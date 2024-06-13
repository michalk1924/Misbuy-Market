require('dotenv').config();

const AccountAccessRepository = require('../repositories/AccountAccessRepository');
const { Exception, UnauthorizedException, InternalServerException } = require('../Exception');

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class AccountAccessService {

    constructor(repo) {
        this.repository = repo;
    }

    async SignIn({ email, password }) {
        try {
            const user = await this.repository.SignIn(email);
            const newHashPassword = await bcrypt.hash(password, user.salt);
            console.log("newHashPassword " + newHashPassword);
            const isMatch = user.hashPassword == newHashPassword;
            if (!isMatch) {
                throw new UnauthorizedException('worng password');
            }
            const tokenSecrete = process.env.TOKEN_SECRET;
            const token = jwt.sign({
                role: 'connected',
            }, tokenSecrete, {
                algorithm: 'HS256',
                expiresIn: '5m',
                issuer: 'my-api',
                subject: user.email
            })
            return { token };
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
            const saltRounds = 10 //process.env.SALT_ROUNDS;
            console.log(saltRounds);
            const salt = await bcrypt.genSalt(saltRounds);
            console.log("salt: ", salt);
            const hashPassword = await bcrypt.hash(password, salt);
            console.log("hashPassword " + hashPassword);
            user.hashPassword = hashPassword;
            user.salt = salt;
            user.password = null;
            const userId = await this.repository.SignUp(user);
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
            return { token, userId };
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


generateTokenSecret = () => {
    return crypto.randomBytes(32).toString('hex');
}

const nodemailer = require('nodemailer');

async function sendVerificationCodeEmail(emailAddress) {
    // הגדרת משתני SMTP
    const transporter = nodemailer.createTransport({
        host: '172.253.63.27', // החלף בשרת SMTP שלך
        port: 587,
        secure: true, // השתמש ב-TLS
        auth: {
            user: 'mkastner@g.jct.ac.il', // כתובת הדואר האלקטרוני שלך
            pass: 'MKmk1924' // סיסמת הדואר האלקטרוני שלך
        }
    });

    // יצירת קוד אימות אקראי
    const verificationCode = randomString(6); // פונקציה זו אינה מוגדרת בדוגמה זו

    // יצירת תוכן הודעת הדואר האלקטרוני
    const message = {
        from: '"Misbuy - Market" <mkastner@g.jct.ac.il>', // שם ושליח
        to: emailAddress,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`
    };

    // שליחת הודעת הדואר האלקטרוני
    await transporter.sendMail(message);

    console.log(`Verification code sent to ${emailAddress}`);
}

// פונקציה לדוגמה ליצירת מחרוזת אקראית
function randomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

//sendVerificationCodeEmail("michalk1924@gmail.com")

module.exports = new AccountAccessService(AccountAccessRepository);