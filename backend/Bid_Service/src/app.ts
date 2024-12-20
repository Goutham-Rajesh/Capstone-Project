import express from 'express';
import mongoose from 'mongoose';
import bidRoutes from './routes/bidRoutes';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware to parse JSON
app.use(express.json());
app.use(cors())

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Bid')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Bid routes
app.use(bidRoutes);

// Sample route


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
