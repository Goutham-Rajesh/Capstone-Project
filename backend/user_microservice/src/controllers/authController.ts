import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';




export const register = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { name, email, phone, address, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ name, email, phone, address, password: hashedPassword, role });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log(req.body)
  const { email, password } = req.body;
  console.log(email)
  const user = await User.findOne({ where: { email } });

  if (!user) {
    res.status(400).json({ message: 'User not found' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ user: user, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '2h' });
  res.json({ 'token':token,'userId':user.userId,'role':user.role });
};
