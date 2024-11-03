import express from 'express';
import { Request, Response } from 'express'
import { register, login, updateUserProfile } from '../controllers/authController';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import User from '../models/User';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', authenticateToken, authorizeRole(['Admin', 'Chit Creator']), async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});
router.get('/user/:id',authenticateToken,async (req, res) => {
  const users = await User.findByPk(req.params.id)
  res.json(users);
});
router.patch('/userProfile/:id', updateUserProfile); // New route for updating user profile





// Assuming authenticateToken is a middleware for authentication
router.get('/user/email/:email', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.params.email,
      }
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return ;
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user by email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
