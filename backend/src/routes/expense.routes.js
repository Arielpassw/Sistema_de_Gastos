import { Router } from 'express';

import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
} from '../controllers/expense.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authMiddleware, createExpense);
router.get('/', authMiddleware, getExpenses);
router.get('/:id', authMiddleware, getExpenseById);
router.put('/:id', authMiddleware, updateExpense);
router.delete('/:id', authMiddleware, deleteExpense);

export default router;