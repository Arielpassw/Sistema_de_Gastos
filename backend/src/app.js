import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Backend Sistema de Gastos funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);

export default app;