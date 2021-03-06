const jwt = require('jsonwebtoken');
require("dotenv").config();


const secret = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'secret';
const authService = () => {
  // const issue = (payload) => jwt.sign(payload, secret, { expiresIn: 10800 });
  const issue = (payload) => jwt.sign(payload, secret, {});
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
