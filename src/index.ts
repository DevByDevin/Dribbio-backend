import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth';
import activites from './routes/activities';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes, activites);

app.get('/api/health', (_, res) => {
  res.send({ status: 'ok', message: 'Dribbio API is live!' });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });

    console.log('✅ Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}

startServer();
