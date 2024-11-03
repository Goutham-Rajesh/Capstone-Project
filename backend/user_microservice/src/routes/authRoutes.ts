import express from 'express';
import { Request, Response } from 'express'
import { register, login } from '../controllers/authController';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const router = express.Router();
interface Users{
   name:string, email:string, phone:string, address:string, password:string, role:string
}

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




// Assuming authenticateToken is a middleware for authentication
router.get('/user/email/:email', async (req, res) => {
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


router.post('/users',async (req, res) => {
  const user:User[]=req.body;
  try{
    user.forEach( async (user) => { 
      user.password= await bcrypt.hash(user.password, 10);
      await  User.create(user);});
    console.log('added user');
  }catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  res.json({ message: 'Users added successfully' });
 


})

router.get('/user/getemail/:id',async (req, res) => {
  const users = await User.findByPk(req.params.id)
  res.json({email:users?.email});
});

export default router;
