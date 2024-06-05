const jwt = require('jsonwebtoken');
const { Exception } = require('./Exception');

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//     const userId = decodedToken.userId;
//     if (req.body.userId && req.body.userId !== userId) {
//       throw 'Invalid user ID';
//     } else {
//       next();
//     }
//   } catch {
//     res.status(401).json({
//       error: new Error('Invalid request!')
//     });
//   }
// };

const auth = (requiredRole) => {
  return (req, res, next) => {
    const { token } = req.headers;
    if (token == null) {
      res.sendStatus(403);
      return;
    }
    try {
      const tokenSecret = process.env.TOKEN_SECRET;
      const { exp, iss, role } = jwt.verify(token, tokenSecret);

      if (iss === 'my-api' && exp < Date.now() && role === requiredRole) {
        next();
        return;
      }
    } catch (err) {
      res.sendStatus(403);
      return;
    }
  }
}

module.exports = { auth }