BEGIN;
DROP TABLE IF EXISTS users,
posts CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100)
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    content TEXT,
    img VARCHAR(255),
    vedio VARCHAR(255),
    varg INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users (email, password, username)
VALUES ('husam@gmail.com', 'husam123465', 'husam'),
    ('husam1@gmailcom', 'husam132456', 'husamkamal');
INSERT INTO posts (user_id, content, img, vedio, varg)
VALUES (1, 'HI HUSAM KAMAL ', 'IMGuRL', 'VIDIOuRL', '200');
COMMIT;