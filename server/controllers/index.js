const Queries = require('../queries');
const Validation = require('../Validation');

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
}

module.exports = Controllers;
