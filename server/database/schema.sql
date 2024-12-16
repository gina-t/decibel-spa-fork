-- DROP DATABASE
DROP DATABASE IF EXISTS spotify_ui;

-- CREATE DATABASE
CREATE DATABASE spotify_ui;

-- Connect to the newly created database
\c spotify_ui;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,                   -- Auto-incrementing integer primary key
    username VARCHAR(255) NOT NULL,          -- Username (required)
    email VARCHAR(255) NOT NULL UNIQUE,      -- Email (required and unique)
    password VARCHAR(255) NOT NULL,          -- Password (required)

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the playlist table
CREATE TABLE playlist (
    id SERIAL PRIMARY KEY,                     -- Auto-incrementing integer primary key
    album_key VARCHAR(255) NOT NULL,
    album_artist VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    release_date VARCHAR(255),
    album_img VARCHAR(255),
    album_spotify_url VARCHAR(255),
    artist_spotify_url VARCHAR(255),
    assignedUserId INTEGER REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to users table

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);