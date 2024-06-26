const jwt = require('jsonwebtoken');
const { Exception } = require('./Exception');

const auth = (requiredRole, action) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
      console.log('No authorization header provided');
      return res.sendStatus(403);
    }

    try {
      console.log('Token:', token);
      const tokenSecret = process.env.TOKEN_SECRET;
      const { exp, iss, role, sub } = jwt.verify(token, tokenSecret);
      if (iss === 'my-api' && exp > Date.now() / 1000 && role === requiredRole) {
        if (action == 'post')
          req.body.userId = sub;
        else if (action == 'put' || action == 'delete')
          if (req.body.userId != sub)
            throw new Exception('You are not authorized to do this action');
        next();
      } else {
        console.log('Token is invalid or has expired');
        res.sendStatus(403);
      }
    } catch (err) {
      console.log('JWT verification error');
      res.sendStatus(403);
    }
  }
}

module.exports = { auth }
