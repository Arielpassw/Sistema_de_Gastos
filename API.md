# Documentación de la API

Base local: `http://localhost:4000`. Todas las rutas protegidas requieren:

```http
Authorization: Bearer <access_token_de_supabase>
Content-Type: application/json
```

Las respuestas usan normalmente `success`, `message` y `data`. Los errores devuelven `success: false` y `message`.

## Autenticación

### `POST /api/auth/register`

Crea una cuenta en Supabase. Parámetros: `first_name`, `last_name`, `age` (mínimo 25), `email`, `password` (mínimo 8) y `password_confirmation`.

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Ana","last_name":"Pérez","age":25,"email":"ana@example.com","password":"Clave123!","password_confirmation":"Clave123!"}'
```

Devuelve `201` con `data` de Supabase y el mensaje de verificación de correo.

### `POST /api/auth/login`

Parámetros: `email`, `password`. Devuelve `200` con `data.user`, `data.session` (incluye `access_token`) y `data.profile`. Rechaza usuarios inactivos.

### `POST /api/auth/google`

No recibe cuerpo. Devuelve `200` con `url`, la dirección de autorización de Google.

### `GET /api/auth/profile`

Protegida. Devuelve el usuario autenticado en `user` y su perfil en `profile`.

### `PUT /api/auth/profile`

Protegida. Actualiza `first_name`, `last_name`, `age`, `salary`, `children_count`, `pets_count` y `categories` (arreglo). Marca el perfil como completado.

```json
{
  "first_name": "Ana",
  "last_name": "Pérez",
  "age": 25,
  "salary": 850,
  "children_count": 0,
  "pets_count": 1,
  "categories": ["Alimentación", "Transporte"]
}
```

Devuelve `200` con el perfil actualizado en `profile`.

### Contraseña

- `POST /api/auth/forgot-password`: recibe `email` y envía el enlace de recuperación.
- `PUT /api/auth/update-password`: protegida; recibe `password` de al menos ocho caracteres y devuelve los datos actualizados de Supabase.

## Gastos

Todas las rutas de esta sección son protegidas y solo actúan sobre registros del usuario autenticado.

| Método y ruta | Parámetros | Devuelve |
| --- | --- | --- |
| `POST /api/expenses` | `title`, `amount` (> 0), `category`, `expense_date`; `description` opcional | `201` y el gasto creado en `data`. |
| `GET /api/expenses` | Filtros opcionales `category`, `start_date`, `end_date` | `200` y el arreglo de gastos en `data`. |
| `GET /api/expenses/:id` | `id` | `200` y el gasto en `data`. |
| `PUT /api/expenses/:id` | Uno o más: `title`, `description`, `amount`, `category`, `expense_date` | `200` y el gasto actualizado. |
| `DELETE /api/expenses/:id` | `id` | `200` y el gasto eliminado. |

Ejemplo:

```bash
curl -X POST http://localhost:4000/api/expenses \
  -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"title":"Supermercado","amount":42.50,"category":"Alimentación","expense_date":"2026-07-18","description":"Compra semanal"}'
```

## Ingresos

| Método y ruta | Parámetros | Devuelve |
| --- | --- | --- |
| `POST /api/incomes` | `title`, `amount` (> 0), `income_date`; `description` opcional | `201` y el ingreso creado. |
| `GET /api/incomes` | Filtros opcionales `start_date`, `end_date` | `200` y los ingresos en `data`. |
| `GET /api/incomes/:id` | `id` | `200` y el ingreso. |
| `PUT /api/incomes/:id` | Uno o más: `title`, `description`, `amount`, `income_date` | `200` y el ingreso actualizado. |
| `DELETE /api/incomes/:id` | `id` | `200` y el ingreso eliminado. |

## Historial

### `GET /api/history`

Protegida. Une ingresos y gastos del usuario, los ordena por creación descendente y devuelve `200` con `data`. Cada elemento incluye `type`, `title`, `category`, `description`, `amount`, `date` y metadatos visuales.

## Pagos

### `POST /api/payments/create-checkout-session`

Protegida. No recibe cuerpo. Crea una sesión de pago única de Stripe con el precio definido en `STRIPE_PRICE_ID`. Devuelve `200`:

```json
{ "success": true, "data": { "url": "https://checkout.stripe.com/..." } }
```

### `POST /api/payments/webhook`

Ruta para Stripe; recibe el cuerpo crudo y la cabecera `stripe-signature`. Cuando Stripe comunica `checkout.session.completed`, el perfil asociado se actualiza a `plan: "PRO"` e `is_pro: true`.

## IA financiera

### `POST /api/ai/chat`

Protegida y exclusiva para perfiles con `plan: "PRO"` e `is_pro: true`. Recibe `messages`, un arreglo no vacío de objetos `{ role, content }`; `mode` es opcional y por defecto `financial`. Se conservan los últimos diez mensajes, con hasta 3000 caracteres cada uno.

```json
{
  "messages": [{ "role": "user", "content": "¿Cómo preparo un presupuesto mensual?" }],
  "mode": "financial"
}
```

Devuelve `200` con `data.answer`. Si el perfil no es PRO, devuelve `403`.

## Administración

Todas las rutas requieren token y rol `admin`.

| Método y ruta | Parámetros | Devuelve |
| --- | --- | --- |
| `GET /api/admin/dashboard/summary` | — | Totales de usuarios, roles, perfiles y estados. |
| `GET /api/admin/users` | — | Lista de perfiles. |
| `GET /api/admin/users/:id` | `id` | Perfil solicitado. |
| `PUT /api/admin/users/:id/role` | `role`: `user` o `admin` | Perfil con rol actualizado. |
| `PUT /api/admin/users/:id/status` | `is_active`: booleano | Perfil con estado actualizado. |
| `DELETE /api/admin/users/:id` | `id` | Perfil eliminado. |
| `GET /api/admin/statistics/users-by-role` | — | Conteos `admin` y `user`. |
| `GET /api/admin/statistics/profile-status` | — | Conteos `completed` e `incomplete`. |
| `GET /api/admin/statistics/top-categories` | — | Categorías y total de uso. |
| `GET /api/admin/activity` | — | Diez perfiles más recientes. |

Ejemplo de cambio de estado:

```bash
curl -X PUT http://localhost:4000/api/admin/users/USER_ID/status \
  -H "Authorization: Bearer $ADMIN_TOKEN" -H "Content-Type: application/json" \
  -d '{"is_active":false}'
```
