const connection = require('../database/connection');

class Queries {
  static selectPosts() {
    return connection.query('SELECT * FROM posts');
  }

  static selectUsers() {
    return connection.query('SELECT * FROM users');
  }

  static addUser({ email, password, username }) {
    return connection.query('INSERT INTO users(email , password, username) VALUES ($1,$2,$3 ) RETURNING *', [email, password, username]);
  }

  static login(username) {
    return connection.query('SELECT * FROM users WHERE users.username = $1', [username]);
  }
}

module.exports = Queries;
