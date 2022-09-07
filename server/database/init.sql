BEGIN;
DROP TABLE IF EXISTS users,
posts CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    imag TEXT
);
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    content TEXT,
    img TEXT,
    vedio TEXT,
    varg INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO users (email, password, username, imag)
VALUES ('husam@gmail.com', 'husam123465', 'husam', 'https://pps.whatsapp.net/v/t61.24694-24/197091151_354939723197695_1626617075516079400_n.jpg?ccb=11-4&oh=01_AVx9pfvePCzlpYw1aKDtoQb_7Es-5Am-44PL127m1af0DQ&oe=632265A0'),
    ('husam1@gmailcom', 'husam132456', 'husamkamal', 'https://pps.whatsapp.net/v/t61.24694-24/197091151_354939723197695_1626617075516079400_n.jpg?ccb=11-4&oh=01_AVx9pfvePCzlpYw1aKDtoQb_7Es-5Am-44PL127m1af0DQ&oe=632265A0');
INSERT INTO posts (user_id, content, img, vedio, varg)
VALUES (1, 'HI HUSAM KAMAL ', 'https://pps.whatsapp.net/v/t61.24694-24/197091151_354939723197695_1626617075516079400_n.jpg?ccb=11-4&oh=01_AVx9pfvePCzlpYw1aKDtoQb_7Es-5Am-44PL127m1af0DQ&oe=632265A0',  'https://pps.whatsapp.net/v/t61.24694-24/197091151_354939723197695_1626617075516079400_n.jpg?ccb=11-4&oh=01_AVx9pfvePCzlpYw1aKDtoQb_7Es-5Am-44PL127m1af0DQ&oe=632265A0', '200');
COMMIT;