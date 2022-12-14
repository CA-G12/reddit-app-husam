const bcrypt = require('bcryptjs');
const Queries = require('../queries');
const generateToken = require('../Util/generateToken');
require('dotenv').config();

class Middleware {
  static hashPassword(req, res) {
    const { password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.json(err);
      Queries.addUser({ ...req.body, password: hash })
        .then(() => res.status(201).json({ msg: 'successfully operation ' }))
        .catch(
          (errData) => res.json({ msg: errData }),
        );
    });
  }

  static checkPassword(req, res) {
    Queries.login(req.body.username)
      .then((data) => {
        if (data.rowCount) {
          bcrypt.compare(req.body.password, data.rows[0].password, (err, result) => {
            if (err) return res.send(err);
            if (result) {
              generateToken(data.rows[0]).then((token) => {
                res.cookie('token', token).json({ msg: 'login successfully' });
              }).catch(() => res.json({ msg: 'inernal server error' }));
            } else {
              res.json({ msg: 'password is not matching ', status: '401' });
            }
          });
        } else {
          throw { msg: 'there is no account with this username', status: 401 };
        }
      })
      .catch((err) => res.status(err.status || 500).send(err.msg || 'internal server error'));
  }
}

module.exports = Middleware;
