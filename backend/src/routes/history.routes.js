import { Router } from 'express';

import { getHistory } from '../controllers/history.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getHistory);

export default router;