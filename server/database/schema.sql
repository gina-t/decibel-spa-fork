-- DROP DATABASE
DROP DATABASE IF EXISTS user_db;

-- CREATE DATABASE
CREATE DATABASE user_db;

-- Connect to the newly created database
\c kanban_db

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);