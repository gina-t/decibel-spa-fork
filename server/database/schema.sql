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

-- Create the playlist table
CREATE TABLE playlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_key VARCHAR(255) NOT NULL,
    album_artist VARCHAR(255) NOT NULL,
    album_name VARCHAR(255) NOT NULL,
    release_date DATE NOT NULL,
    album_img VARCHAR(255),
    album_spotify_url VARCHAR(255),
    artist_spotify_url VARCHAR(255),
    assignedUserId UUID REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);