import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import sensorRoutes from './routes/sensor.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: 'https://sensorflow-client-sma.vercel.app' || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/channels', sensorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});