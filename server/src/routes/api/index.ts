import { Router } from "express";
import playlistRouter from "./playlist-routes.js";
import userRouter from "./user-routes.js";

const router = Router();

router.use('/', userRouter);
router.use('/playlist', playlistRouter);


export default router;
