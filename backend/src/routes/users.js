import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateProfile,
  changePassword,
  validateCreateUser,
  validateUpdateUser
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// User profile routes (accessible by authenticated users)
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

// Admin-only routes
router.get('/', authorize('admin'), getAllUsers);
router.post('/', authorize('admin'), validateCreateUser, createUser);
router.get('/:id', getUserById);
router.put('/:id', authorize('admin'), validateUpdateUser, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

export default router;
