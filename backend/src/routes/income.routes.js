import { Router } from 'express';

import {
  createIncome,
  getIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
} from '../controllers/income.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createIncome);
router.get('/', authMiddleware, getIncomes);
router.get('/:id', authMiddleware, getIncomeById);
router.put('/:id', authMiddleware, updateIncome);
router.delete('/:id', authMiddleware, deleteIncome);

export default router;