# Sistema Web de Control de Gastos Personales con IA

Aplicación web para registrar ingresos y gastos personales, consultar el balance por categoría, administrar perfiles y habilitar un asistente financiero para usuarios del plan PRO.

## Arquitectura

- **Frontend:** React 19, Vite, React Router, Recharts y Lucide.
- **Backend:** Node.js, Express 5 y API REST.
- **Datos y autenticación:** Supabase (Auth y PostgreSQL).
- **Pagos:** Stripe Checkout.
- **Asistente financiero:** Hugging Face Inference.

El frontend se encuentra en `Frontend/` y el backend en `backend/`.

## Requisitos

- Node.js 20 o superior y npm.
- Un proyecto de Supabase con Auth configurado y las tablas `profiles`, `expenses` e `incomes`.
- Cuenta y credenciales de Stripe para habilitar el plan PRO.
- Token y modelo configurados de Hugging Face para el chat financiero.

## Instalación

1. Instale las dependencias del backend:

   ```bash
   cd backend
   npm install
   ```

2. Cree `backend/.env` con estas variables (use valores propios):

   ```env
   PORT=4000
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=
   SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   STRIPE_SECRET_KEY=
   STRIPE_WEBHOOK_SECRET=
   STRIPE_PRICE_ID=
   HF_TOKEN=
   HF_MODEL=
   HF_PROVIDER=
   ```

3. Instale las dependencias del frontend:

   ```bash
   cd ../Frontend
   npm install
   ```

4. Cree `Frontend/.env`:

   ```env
   VITE_API_URL=http://localhost:4000
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   ```

## Ejecución local

Abra dos terminales.

```bash
# Terminal 1
cd backend
npm run dev
```

```bash
# Terminal 2
cd Frontend
npm run dev
```

Abra la dirección que muestre Vite, normalmente `http://localhost:5173`.

## Uso

1. Cree una cuenta con correo y contraseña o inicie sesión con Google.
2. Complete el perfil: salario, datos familiares y una o más categorías.
3. En el dashboard, registre ingresos y gastos con fecha, título, monto y descripción opcional.
4. Consulte ingresos, gastos, balance y totales por las categorías seleccionadas.
5. Desde **Plan PRO**, inicie Stripe Checkout. Al completarse el pago, Stripe actualiza el perfil a `PRO` mediante el webhook.
6. Los usuarios PRO pueden usar el chat de IA para consultas de finanzas personales.
7. Los administradores acceden al panel administrativo para consultar usuarios, categorías y métricas, además de cambiar roles o estados.

## Scripts

| Ubicación | Comando | Uso |
| --- | --- | --- |
| `backend/` | `npm run dev` | Ejecuta el API con Nodemon. |
| `backend/` | `npm start` | Ejecuta el API con Node.js. |
| `Frontend/` | `npm run dev` | Inicia Vite en desarrollo. |
| `Frontend/` | `npm run build` | Genera la compilación de producción. |
| `Frontend/` | `npm run lint` | Ejecuta ESLint. |

## API

La documentación completa de rutas, parámetros, respuestas y ejemplos se encuentra en [API.md](API.md).

## Notas de seguridad

- No publique los archivos `.env` ni claves de Supabase, Stripe o Hugging Face.
- El backend valida el token de Supabase en las rutas protegidas.
- La clave `SUPABASE_SERVICE_ROLE_KEY` solo debe existir en el backend.
- En producción, configure `FRONTEND_URL`, los orígenes CORS y los webhooks con las URL reales.
