const bcrypt = require('bcryptjs');
const Queries = require('../queries');
const generateToken = require('../Util/generateToken');
require('dotenv').config();

class Middleware {
  static hashPassword(req, res) {
    const { password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.send(err);
      Queries.addUser({ ...req.body, password: hash })
        .then(() => res.status(201).send('successfully operation '))
        .catch(
          (errData) => res.status(400).json(errData.detail),
        );
    });
  }

  static checkPassword(req, res) {
    Queries.login(req.body.email)
      .then((data) => {
        if (data.rowCount) {
          bcrypt.compare(req.body.password, data.rows[0].password, (err, result) => {
            if (err) return res.send(err);
            if (result) {
              generateToken(data.rows[0]).then((token) => {
                res.cookie('token', token).send('login successfully');
              }).catch(() => res.send('inernal server error'));
            } else {
              res.json({ msg: 'password is not matching ', status: '401' });
            }
          });
        } else {
          throw { msg: 'there is no account with this email', status: 401 };
        }
      })
      .catch((err) => res.status(err.status || 500).send(err.msg || 'internal server error'));
  }
}

module.exports = Middleware;
