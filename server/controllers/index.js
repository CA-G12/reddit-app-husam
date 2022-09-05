const jwt = require('jsonwebtoken');
const Queries = require('../queries');
const Validation = require('../Validation');
require('dotenv').config();

class Controllers {
  static allPost(req, res) {
    Queries.selectPosts().then((data) => res.json(data.rows));
  }

  static alluser(req, res) {
    Queries.selectUsers().then((data) => res.json(data.rows));
  }

  static signup(req, res, next) {
    Validation.signupValidation(req)
      .then(() => next())
      .catch((err) => {
        if (err.details) {
          res.json(err.details[0].message);
        } else {
          res.json({ msg: 'err' });
        }
      });
  }

  static checkLoggedUser(req, res) {
    if (!req.cookies.token) {
      res.send({ msg: 'no logged user' });
    } else {
      jwt.verify(
        req.cookies.token,
        process.env.SECRET_KEY,
        (err, decoded) => {
          if (err) {
            res.sendStatus(401);
          } else {
            res.send(decoded);
          }
        },
      );
    }
  }

  static logout(req, res) {
    res.clearCookie('token').send('logout');
  }
}

module.exports = Controllers;
