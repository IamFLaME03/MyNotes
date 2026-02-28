import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import noteRoutes from './routes/notes.routes.js';
app.use('/api/notes', noteRoutes);

export default app;
