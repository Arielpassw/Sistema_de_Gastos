import { Router } from 'express';

import {
  getUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUserProfile,
  getAdminSummary,
  getUsersByRole,
  getProfileStatus,
  getTopCategories,
  getAdminActivity
} from '../controllers/admin.controller.js';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/dashboard/summary', authMiddleware, adminMiddleware, getAdminSummary);

router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, getUserById);
router.put('/users/:id/role', authMiddleware, adminMiddleware, updateUserRole);
router.put('/users/:id/status', authMiddleware, adminMiddleware, updateUserStatus);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUserProfile);

router.get('/statistics/users-by-role', authMiddleware, adminMiddleware, getUsersByRole);
router.get('/statistics/profile-status', authMiddleware, adminMiddleware, getProfileStatus);
router.get('/statistics/top-categories', authMiddleware, adminMiddleware, getTopCategories);

router.get('/activity', authMiddleware, adminMiddleware, getAdminActivity);

export default router;