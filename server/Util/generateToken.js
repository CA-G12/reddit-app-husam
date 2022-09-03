const jwt = require('jsonwebtoken');

const generateToken = (paylod) => new Promise((resolve, reject) => {
  jwt.sign(paylod, process.env.SECRET_KEY, (err, token) => {
    if (err) reject(err);
    resolve(token);
  });
});

module.exports = generateToken;
