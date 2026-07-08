import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { proMiddleware } from "../middlewares/pro.middleware.js";

import { chat } from "../controllers/ai.controller.js";

const router = express.Router();


  //  POST "/api/ai/chat"


router.post(
    "/chat",
    authMiddleware,
    proMiddleware,
    chat
);

export default router;