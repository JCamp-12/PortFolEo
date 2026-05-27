import cors from 'cors';
import express from 'express';
import contactRoutes from './routes/contactRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));

app.use('/api/health', healthRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

export default app;
