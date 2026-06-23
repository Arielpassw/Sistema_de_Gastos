import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';

dotenv.config();

const app = express();

// ORÍGENES PERMITIDOS
const allowedOrigins = [
  'http://localhost:5173',
  'https://sistema-de-gastos-2mlp.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {

    // Permite Postman o peticiones sin origin
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('No permitido por CORS'));
  },
  credentials: true
}));

app.use(express.json());

app.use('/api/admin', adminRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Backend Sistema de Gastos funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);

export default app;