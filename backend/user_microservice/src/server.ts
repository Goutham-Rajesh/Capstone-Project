import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import sequelize from './config/database';
import User from './models/User';
import chitRouter from './routes/chitRoutes';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/chit',chitRouter)






async function initializeDatabase() {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync the User model with the database
    await User.sync({ force: true }); // Use force: true only in development
    console.log('User table created successfully!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}


initializeDatabase()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
