import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import expenseRoutes from './routes/expense.routes.js';
import incomeRoutes from './routes/income.routes.js';
import paymentsRoutes from "./routes/payments.routes.js";
import aiRoutes from "./routes/ai.routes.js";

dotenv.config();

const app = express();

// ORÍGENES PERMITIDOS
const allowedOrigins = [
  'http://localhost:5173',
  'https://sistema-de-gastos-2mlp.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {

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

// IMPORTANTE:
// El webhook debe ir ANTES del express.json()

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));

app.use(express.json());

app.use('/api/admin', adminRoutes);

app.use('/api/expenses', expenseRoutes);

app.use('/api/incomes', incomeRoutes);

app.use("/api/payments", paymentsRoutes);

app.use("/api/ai", aiRoutes);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({
    ok: true,
    message: 'Backend Sistema de Gastos funcionando correctamente'
  });
});

app.use('/api/auth', authRoutes);

export default app;