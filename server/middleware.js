const jwt = require('jsonwebtoken');
const { Exception } = require('./Exception');

const auth = (requiredRole) => {
  return (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) {
    //   res.sendStatus(403);
    //   return;
    // }

    // const token = authHeader.split(' ')[1];
    // if (!token) {
    //   res.sendStatus(403);
    //   return;
    // }

    // try {
    //   const tokenSecret = process.env.TOKEN_SECRET;
    //   const { exp, iss, role, sub } = jwt.verify(token, tokenSecret);
    //   if (iss === 'my-api' && exp < Date.now() && role === requiredRole) {
    //     req.body.userId = sub;
    //     next();
    //     return;
    //   }
    //   else res.sendStatus(403);
    // } catch (err) {
    //   console.log(err);
    //   res.sendStatus(403);
    //   return;
    // }
    next();
  }
}


module.exports = { auth }