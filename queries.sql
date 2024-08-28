CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    date_read DATE,
    notes VARCHAR(500),
    rating INT,
    user_id INT REFERENCES users(id)
);

ALTER TABLE notes ADD COLUMN isbn INT;

SELECT * FROM notes
JOIN users ON users.id = notes.user_id;