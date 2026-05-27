import cors from 'cors';
import express from 'express';
import healthRoutes from './routes/healthRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);

export default app;
