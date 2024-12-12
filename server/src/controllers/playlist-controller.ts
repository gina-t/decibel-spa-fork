import { Request, Response } from 'express';
import { User } from '../models/User';
import { Playlist } from '../models/Playlist';

interface AlbumDataType {
  album_key: string;
  album_artist: string;
  album_name: string;
  release_date: string;
  album_img: string;
  album_spotify_url: string;
  artist_spotify_url: string;
}

// GET /Albums
export const getPlaylistForUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const albums = await Playlist.findAll({
            where: { userId },
        });
        res.json(albums);
    } catch (error: any) {
        console.error('Error fetching albums:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// POST /Albums
// Controller to save album data to the playlist table
export const saveAlbumToPlaylist = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Extract userId from the authenticated request
      const userId = req.user?.username; // Assumes middleware adds `user` to the request object
  
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
  
      // Extract album data from the request body
      const {
        album_key,
        album_artist,
        album_name,
        release_date,
        album_img,
        album_spotify_url,
        artist_spotify_url,
      } = req.body;
  
      // Validate required fields
      if (!album_key || !album_artist || !album_name || !release_date) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      // Create a new playlist entry in the database
      const newPlaylist = await Playlist.create({
        userId,
        album_key,
        album_artist,
        album_name,
        release_date,
        album_img,
        album_spotify_url,
        artist_spotify_url,
      });
  
      // Return success response with the created playlist
      return res.status(201).json({
        message: 'Playlist created successfully',
        playlist: newPlaylist,
      });
    } catch (error) {
      console.error('Error creating playlist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };



// DELETE /Albums
// Controller to remove album data from the playlist table
export const removeAlbumFromPlaylist = async (req: Request, res: Response): Promise<Response> => {
    try {
      // Extract userId from the authenticated request
      const userId = req.user?.username; // Assumes middleware adds `user` to the request object
  
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
  
      // Extract album_key from the request body
      const { album_key } = req.body;
  
      if (!album_key) {
        return res.status(400).json({ message: 'Missing album key' });
      }
  
      // Find and delete the album from the user's playlist
      const deletedCount = await Playlist.destroy({
        where: {
          userId,
          album_key,
        },
      });
  
      if (deletedCount === 0) {
        return res.status(404).json({ message: 'Album not found in playlist' });
      }
  
      return res.status(200).json({ message: 'Album removed from playlist successfully' });
    } catch (error) {
      console.error('Error removing album from playlist:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };


