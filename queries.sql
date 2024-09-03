DROP TABLE IF EXISTS users, notes;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    isbn INT,
    title VARCHAR(45),
    date_read VARCHAR(50),
    notes VARCHAR(500),
    rating INT,
    user_id INT REFERENCES users(id) ON DELETE CASCADE
);

SELECT * FROM notes JOIN users ON users.id = notes.user_id;