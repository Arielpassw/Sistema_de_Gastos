import app from './app.js';

const PORT = process.env.PORT || 4000;

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
  });
}

export default app;