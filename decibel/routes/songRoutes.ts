import { Router, Request, Response } from 'express';
import Song from '.../models/Song.ts';
import Artist from '../models/Artist';

const router: Router = Router();

// Add a new song
router.post('/', async (req: Request, res: Response) => {
  const { title, duration, artistId } = req.body;

  try {
    const song = await Song.create({ title, duration, artistId });
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all songs
router.get('/', async (req: Request, res: Response) => {
  try {
    const songs = await Song.findAll({ include: [Artist] });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
