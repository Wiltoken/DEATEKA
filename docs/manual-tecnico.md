# Manual técnico

Guía de instalación, configuración, base de datos y despliegue de DEATEKA.

## Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | 20.9 o superior (probado con 22) |
| npm | 10+ |

No se requieren servicios externos: la base de datos es un archivo SQLite local.

## Instalación

```bash
git clone <url-del-repositorio>
cd deateka
npm install
```

## Variables de entorno

Copiá el archivo de ejemplo y ajustá si es necesario:

```bash
cp .env.example .env
```

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de la base de datos SQLite | `file:./dev.db` |

> La ruta de SQLite es **relativa a `prisma/schema.prisma`**. Con el valor por
> defecto, la base se crea en `prisma/dev.db`.

## Base de datos

```bash
# Aplicar migraciones (crea el esquema)
npm run db:migrate

# Sembrar datos de ejemplo (15 productos, categorías y un admin)
npm run db:seed

# Explorar los datos visualmente
npm run db:studio
```

### Datos de ejemplo

El seed crea un usuario administrador:

| Campo | Valor |
|-------|-------|
| Email | `admin@deateka.com` |
| Contraseña | `cambiame123` |

> La contraseña del seed es de demostración y **no** está hasheada. No usar en
> producción.

## Ejecutar la aplicación

### Desarrollo

```bash
npm run dev
# http://localhost:3000
```

### Producción

```bash
npm run build
npm run start
```

## Despliegue

La aplicación puede desplegarse en cualquier plataforma que soporte Next.js
(Vercel, un servidor con Node, o un contenedor Docker).

Puntos a tener en cuenta:

1. **Base de datos**: SQLite es un archivo local. En un entorno de varios
   servidores o serverless, migrar a PostgreSQL (cambiar `DATABASE_URL` y el
   `provider` en `prisma/schema.prisma`).
2. **Variables de entorno**: definir `DATABASE_URL` en la plataforma.
3. **Seed**: ejecutar `npm run db:migrate` y `npm run db:seed` una sola vez.

## Calidad

| Comando | Qué hace |
|---------|----------|
| `npm run lint` | ESLint (reglas de Next.js) |
| `npm run build` | Build de producción + chequeo de tipos |

## Limitaciones conocidas

Estos puntos están pendientes y deben resolverse antes de un lanzamiento real:

| Limitación | Impacto |
|-----------|---------|
| El panel `/admin` **no exige autenticación** | Cualquiera con la URL puede crear/editar/borrar productos |
| El checkout **no crea pedidos** en la base de datos | El flujo de compra es simulado |
| No hay pasarela de pago | Solo se muestra un resumen del pedido |
| Los productos **no tienen imágenes reales** | Se muestran marcadores de posición |
| Carrito y favoritos son **solo locales** | No se sincronizan entre dispositivos |
| Contraseñas sin hashear | El `User.password` no usa hash |
