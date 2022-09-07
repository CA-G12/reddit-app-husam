const connection = require('../database/connection');

class Queries {
  static selectPosts() {
    return connection.query('SELECT * FROM posts');
  }

  static selectUsers() {
    return connection.query('SELECT * FROM users');
  }

  static addUser({ email, password, username }) {
    return connection.query('INSERT INTO users(email , password, username) VALUES ($1,$2,$3 )  RETURNING *', [email, password, username]);
  }

  static login(username) {
    return connection.query('SELECT * FROM users WHERE users.username = $1', [username]);
  }

  static addPost({
    content, img, vedio, varg, user_id,
  }) {
    return connection.query(
      'INSERT INTO posts (content, img, vedio, varg, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
      [content, img, vedio, varg, user_id],
    );
  }

  static deletePost({ post_id, user_id }) {
    console.log({ post_id, user_id });
    return connection.query('DELETE FROM posts WHERE  id = $1 and user_id = $2  RETURNING *', [post_id, user_id]);
  }

  static myPost(id) {
    return connection.query('SELECT * FROM posts WHERE user_id = $1', [id]);
  }

  static update({ user_id, username }) {
    return connection.query('UPDATE users SET username = $1 WHERE id = $2 RETURNING *', [username, user_id]);
  }
}

module.exports = Queries;
