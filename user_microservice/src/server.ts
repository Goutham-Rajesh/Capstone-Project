import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import sequelize from './config/database';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error: ' + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
