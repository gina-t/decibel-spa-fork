-- DROP DATABASE
DROP DATABASE IF EXISTS spotify_ui;

-- CREATE DATABASE
CREATE DATABASE spotify_ui;

-- Connect to the newly created database
\c spotify_ui;

-- Create the users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other tables and database objects as needed