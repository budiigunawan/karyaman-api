/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      res.status(401);
      throw new Error('🚫 Un-Authorized 🚫');
    }

    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.payload = payload;
  } catch (err) {
    res.status(401);
    if (err.name === 'TokenExpiredError') {
      throw new Error(err.name);
    }
    throw new Error('🚫 Un-Authorized 🚫');
  }

  return next();
}

module.exports = {
  // ... other modules
  isAuthenticated,
};
