import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import sequelize from './config/database';
import User from './models/User';

import axios from 'axios';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use('/', authRoutes);







async function initializeDatabase() {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connected');

    // Sync the User model with the database
    await User.sync({ alter: true}); // Use force: true only in development
    console.log('User table created successfully!');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}


initializeDatabase()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


