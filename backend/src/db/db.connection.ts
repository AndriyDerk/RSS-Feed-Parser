import mongoose from 'mongoose';
import { MONGO_URI } from './db.config';

export const connectDB = async (): Promise<void> => {
  try {

    if(!MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Error connecting to DB:', error);
    process.exit(1); 
  }
};

export const closeDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('DB connection closed');
  } catch (error) {
    console.error('Error closing DB connection:', error);
  }
};
