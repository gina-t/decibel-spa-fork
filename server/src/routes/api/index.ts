import { Router } from "express";
import { playlistRouter } from "./playlist-routes.js";
import { userRouter } from "./user-routes.js";

const router = Router();

router.use("/albums", playlistRouter);
router.use("/users", userRouter);

export { router as apiRoutes };
