import { Playlist } from '../models/Playlist.js';

export const seedPlaylists = async () => {
  try {
    const playlists = [
      {
        album_key: 'album1',
        album_artist: 'Artist One',
        album_name: 'Album One',
        release_date: new Date('2023-01-01'), // Convert to Date object
        album_img: 'https://example.com/album1.jpg',
        album_spotify_url: 'https://spotify.com/album1',
        artist_spotify_url: 'https://spotify.com/artist1',
        assignedUserId: '1', // Ensure this matches an existing user ID
      },
      {
        album_key: 'album2',
        album_artist: 'Artist Two',
        album_name: 'Album Two',
        release_date: new Date('2023-02-01'), // Convert to Date object
        album_img: 'https://example.com/album2.jpg',
        album_spotify_url: 'https://spotify.com/album2',
        artist_spotify_url: 'https://spotify.com/artist2',
        assignedUserId: '2', // Ensure this matches an existing user ID
      },
      {
        album_key: 'album3',
        album_artist: 'Artist Three',
        album_name: 'Album Three',
        release_date: new Date('2023-03-01'), // Convert to Date object
        album_img: 'https://example.com/album3.jpg',
        album_spotify_url: 'https://spotify.com/album3',
        artist_spotify_url: 'https://spotify.com/artist3',
        assignedUserId: '3', // Ensure this matches an existing user ID
      },
    ];

    // Bulk create playlists
    await Playlist.bulkCreate(playlists);
    console.log('Playlists seeded successfully.');
  } catch (error) {
    console.error('Error seeding playlists:', error);
    throw error;
  }
};
