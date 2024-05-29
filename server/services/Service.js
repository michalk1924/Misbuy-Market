const {Exception, InternalServerException} = require('../Exception');


class Service {

    constructor(repository) {
        this.repository = repository;
    }

    async getAll(filter) {
        try{
            return this.repository.getAll(filter);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }


    async get(id) {
        try{
            return this.repository.get(id);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async insert(data) {
        try{
            return this.repository.insert(data);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async update(id, data) {
        try{
            return this.repository.update(id, data);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }

    async delete(id) {
        try{
            return this.repository.delete(id);
        }
        catch(error){
            if (!error instanceof Exception)
                error = new InternalServerException()
            throw error;
        }
    }
}

const nodemailer = require('nodemailer');

async function sendVerificationCodeEmail(emailAddress) {
  // הגדרת משתני SMTP
  const transporter = nodemailer.createTransport({
    host:'172.253.63.27', // החלף בשרת SMTP שלך
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

  

module.exports = { Service };
