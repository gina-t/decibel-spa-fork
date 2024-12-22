import express from "express";
import apiRoutes from "./api/index.js";

const router = express.Router();

router.use('/user', apiRoutes);

export default router;
