import mongoose from 'mongoose';
import { env } from './env.js';

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.log('MongoDB not configured. Skipping database connection.');
    return;
  }

  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
}
