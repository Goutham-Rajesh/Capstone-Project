import express from 'express';
import { register, login } from '../controllers/authController';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeRole(['Admin', 'Chit Creator']), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

export default router;
