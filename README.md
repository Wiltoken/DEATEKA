# DEATEKA

Tienda en línea de muebles, iluminación y decoración con diseño único.
Proyecto de e-commerce construido con **Next.js 16 (App Router)**, **TypeScript**,
**Tailwind CSS v4**, **Prisma** y **Zustand**.

> **Estado:** MVP funcional. Catálogo, carrito y panel de administración
> operativos. Pendientes destacados: autenticación del panel y pago real.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 |
| UI / estilos | React 19 + Tailwind CSS v4 |
| ORM / base de datos | Prisma 5 + SQLite |
| Estado (cliente) | Zustand 5 (carrito y favoritos) |
| Iconos | lucide-react |

## Requisitos

- Node.js 20.9 o superior (probado con Node 22)
- npm 10+

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env        # ajustar DATABASE_URL si hace falta

# 3. Crear la base de datos y sembrar datos de ejemplo
npm run db:migrate
npm run db:seed

# 4. Levantar en desarrollo
npm run dev
```

Abrir <http://localhost:3000>.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción (requiere build previo) |
| `npm run lint` | ESLint |
| `npm run db:migrate` | Aplica migraciones de Prisma |
| `npm run db:seed` | Sembra datos de ejemplo |
| `npm run db:studio` | Abre Prisma Studio |

## Acceso de administración

| Recurso | URL |
|---------|-----|
| Panel | `/admin` |
| Productos | `/admin/productos` |

> El panel aún **no exige autenticación**. Ver *Manual técnico → Limitaciones*.

## Documentación

| Documento | Contenido |
|-----------|-----------|
| [Arquitectura](docs/arquitectura.md) | Diseño técnico, estructura y modelo de datos |
| [Manual técnico](docs/manual-tecnico.md) | Instalación, configuración y despliegue |
| [Manual de usuario](docs/manual-usuario.md) | Uso de la tienda y del panel de administración |
| [Control de versiones](docs/control-de-versiones.md) | Flujo Git, ramas y convenciones |
| [CHANGELOG](CHANGELOG.md) | Historial de versiones |
