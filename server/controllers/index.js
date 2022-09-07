const jwt = require('jsonwebtoken');
const Queries = require('../queries');
const Validation = require('../Validation');
require('dotenv').config();

class Controllers {
  static allPost(req, res) {
    Queries.selectPosts().then((data) => res.json(data.rows));
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

  static addPost(req, res) {
    const {
      content, img, vedio, varg, user_id,
    } = req.body;
    Queries.addPost({
      content, img, vedio, varg, user_id,
    }).then(() => res.json({ msg: 'successfuly post' }));
  }

  static deletePost(req, res) {
    const { post_id, user_id } = req.body;
    Queries.deletePost({ post_id, user_id }).then((data) => res.send('delete success')).catch((err) => res.json(err));
  }

  static myPost(req, res) {
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.send(err);
      Queries.myPost(decoded.id).then((data) => res.json({ post: data, userInfo: decoded }));
    });
  }

  static update(req, res) {
    const { user_id, username } = req.body;
    Queries.update({ user_id, username })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }
}

module.exports = Controllers;
