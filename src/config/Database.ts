import mongoose from 'mongoose';
import { env } from './environment';
import { logService } from '../services/logService';

export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    
    logService.info('Successfully connected to MongoDB');
  } catch (error) {
    logService.error('MongoDB connection error', error);
    process.exit(1);
  }
}

// Connection event listeners
mongoose.connection.on('disconnected', () => {
  logService.warn('Lost MongoDB connection');
});

mongoose.connection.on('reconnected', () => {
  logService.info('Reconnected to MongoDB');
});