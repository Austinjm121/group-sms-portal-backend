import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDatabase } from './config/Database';
import { loadEnvironmentVariables } from './config/Environment';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import messageRoutes from './routes/messageRoutes';
import { errorHandler } from './middleware/errorHandler';
import { logMiddleware } from './middleware/logMiddleware';

// Load environment variables
loadEnvironmentVariables();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(logMiddleware);

// Database connection
connectDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;