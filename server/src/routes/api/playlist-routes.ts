import express from "express";
import { getAllAlbumsFromPlaylist, saveAlbumToPlaylist, deleteAlbumFromPlaylist,} from "../../controllers/playlist-controller.js";

const router = express.Router();

// GET /albums - Get all albums
router.get('/', getAllAlbumsFromPlaylist);

// POST /tickets - Create a new album
router.post('/', saveAlbumToPlaylist);

// DELETE /tickets/:id - Delete an album by id
router.delete('/:albumId', deleteAlbumFromPlaylist);

export default router;
