-- Database schema for CV Maker App

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    profile_image_url TEXT
);

CREATE TABLE education (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    institution VARCHAR(150),
    degree VARCHAR(100),
    start_date DATE,
    end_date DATE
);

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    company VARCHAR(150),
    role VARCHAR(100),
    description TEXT,
    start_date DATE,
    end_date DATE
);

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    skill VARCHAR(100)
);
