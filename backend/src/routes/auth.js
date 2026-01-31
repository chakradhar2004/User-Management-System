import express from 'express';
import {
  signup,
  login,
  logout,
  getMe,
  validateSignup,
  validateLogin
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/logout', logout);

// Protected routes
router.get('/me', protect, getMe);

export default router;
