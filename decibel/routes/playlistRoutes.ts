import { Router, Request, Response } from 'express';
import Playlist from '../models/Playlist';
import Song from '../models/Song';

const router: Router = Router();

// Create a new playlist
router.post('/', async (req: Request, res: Response) => {
  const { name, userId } = req.body;

  try {
    const playlist = await Playlist.create({ name, userId });
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add songs to a playlist
router.post('/:id/songs', async (req: Request, res: Response) => {
  const { id } = req.params; // Playlist ID
  const { songIds } = req.body; // Array of Song IDs

  try {
    const playlist = await Playlist.findByPk(id);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const songs = await Song.findAll({ where: { id: songIds } });
    await playlist.addSongs(songs);
    res.status(200).json({ message: 'Songs added to playlist' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all playlists
router.get('/', async (req: Request, res: Response) => {
  try {
    const playlists = await Playlist.findAll({ include: [Song] });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
