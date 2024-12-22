import { Request, Response } from "express";
import { Playlist } from "../models/Playlist.js";
import { User } from "../models/User.js";

// GET /albums
export const getAllAlbumsFromPlaylist = async (_req: Request, res: Response) => {
  try {
    const playlist = await Playlist.findAll({
      include: [
        {
          model: User,
          as: "assignedUser", // This should match the alias defined in the association
          attributes: ["username"], // Include only the username attribute
        },
      ],
    });
    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /albums
export const saveAlbumToPlaylist = async (req: Request, res: Response) => {
  const {
    album_key,
    album_artist,
    album_name,
    release_date,
    album_img,
    album_spotify_url,
    artist_spotify_url,
    assignedUserId,
  } = req.body;
  try {
    const newAlbumInPlaylist = await Playlist.create({
      album_key,
      album_artist,
      album_name,
      release_date,
      album_img,
      album_spotify_url,
      artist_spotify_url,
      assignedUserId,
    });
    res.status(201).json(newAlbumInPlaylist);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /albums/:album_key
export const deleteAlbumFromPlaylist = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const album = await Playlist.findByPk(id);
    if (album) {
      await album.destroy();
      res.json({ message: "Album deleted" });
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
