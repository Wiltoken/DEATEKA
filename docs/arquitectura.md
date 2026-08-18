# Arquitectura

Este documento describe el diseño técnico de DEATEKA: la tecnología, la
estructura del proyecto y el modelo de datos.

## Resumen

DEATEKA es una aplicación web de e-commerce construida con **Next.js 16 (App
Router)**. Combina componentes de servidor (Server Components) que leen la base
de datos directamente con Prisma, y componentes de cliente para las
interacciones (carrito, favoritos, formularios del panel).

## Stack y por qué

| Tecnología | Rol | Motivación |
|-----------|-----|-----------|
| Next.js 16 (App Router) | Framework full-stack | Server Components, rutas dinámicas y Server Actions en un solo lugar |
| TypeScript | Tipado estático | Seguridad y mantenibilidad |
| Tailwind CSS v4 | Estilos | Design tokens en CSS (`@theme`), sin CSS adicional |
| Prisma + SQLite | Persistencia | ORM tipado; SQLite alcanza para el MVP y es portable |
| Zustand | Estado del cliente | Carrito/favoritos persistentes en `localStorage`, sin Redux |

## Estructura de carpetas

```
src/
├── app/                      # Rutas (App Router)
│   ├── page.tsx              # Home (destacados + novedades)
│   ├── productos/
│   │   ├── page.tsx          # Listado con filtros y orden
│   │   └── [slug]/page.tsx   # Detalle de producto
│   ├── habitaciones/         # Comprar por ambiente
│   ├── inspiracion/          # Galería de inspiración
│   ├── carrito/              # Carrito
│   ├── checkout/             # Checkout (flujo simulado)
│   ├── cuenta/               # Mi cuenta
│   ├── contacto/ envios/ devoluciones/ faq/   # Páginas estáticas
│   └── admin/
│       ├── page.tsx          # Dashboard con estadísticas
│       ├── acciones.ts       # Server Actions (crear/editar/borrar)
│       └── productos/        # Listado, crear y editar producto
├── components/
│   ├── layout/               # Header y Footer
│   ├── products/             # ProductCard y ProductDetail
│   ├── admin/                # Formulario y botón de borrado
│   └── ui/                   # Componentes base (Button)
├── lib/
│   ├── prisma.ts             # Cliente Prisma (singleton)
│   ├── products.ts           # Capa de acceso a datos
│   └── utils.ts              # cn(), formatPrice(), slugify()
└── store/
    ├── cart.ts               # Estado del carrito (Zustand)
    └── wishlist.ts           # Estado de favoritos (Zustand)
```

## Patrones clave

### Server Components + acceso a datos

Las páginas de servidor leen la base de datos directamente a través de
`src/lib/products.ts` (funciones como `getProducts`, `getProductBySlug`).
No hay API REST: la lectura ocurre en el render del servidor.

### Server Actions para mutaciones

Las operaciones de escritura del panel viven en `src/app/admin/actions.ts`
(directiva `"use server"`). Tras cada mutación se llama a `revalidatePath`
para refrescar las páginas afectadas y `redirect` para volver al listado.

### Estado del cliente con Zustand

El carrito y los favoritos son stores de Zustand con el middleware `persist`,
por lo que sobreviven recargas usando `localStorage`. Son solo cliente: aún no
se sincronizan con la base de datos.

### Singleton de Prisma

`src/lib/prisma.ts` reutiliza una única instancia de `PrismaClient` durante el
hot-reload de desarrollo, evitando conexiones duplicadas.

## Modelo de datos

| Modelo | Descripción | Relaciones |
|--------|-------------|------------|
| `User` | Cliente o administrador (`role`) | 1→N `Order`, `WishlistItem` |
| `Category` | Categoría jerárquica (`parentId` opcional) | 1→N `Product` |
| `Product` | Producto del catálogo | N→1 `Category`, 1→N `ProductImage`, `OrderItem`, `WishlistItem` |
| `ProductImage` | Imagen del producto (`isPrimary`, `order`) | N→1 `Product` |
| `Order` | Pedido (dirección, total, estado) | N→1 `User`, 1→N `OrderItem` |
| `OrderItem` | Línea de pedido (cantidad, precio) | N→1 `Order`, `Product` |
| `WishlistItem` | Favorito de un usuario | N→1 `User`, `Product` |

### Atributos destacados de `Product`

- `price` / `compareAt`: precio y precio de referencia (para calcular descuento).
- `stock`: unidades disponibles.
- `isFeatured`, `isNew`, `isBestSeller`: banderas que alimentan la home.
- `color`, `material`, `dimensions`, `weight`: ficha técnica.

## Decisiones de diseño

| Decisión | Razón |
|----------|-------|
| SQLite para el MVP | Sin infraestructura extra; migrar a PostgreSQL solo requiere cambiar `DATABASE_URL` |
| Filtro de categoría con `OR` (categoría o subcategoría) | "Muebles" incluye sus hijos (mesas, sillas, etc.) |
| Slugs únicos y auto-generados | URL limpias; `slugify()` normaliza acentos |
| Precios en `Float` | Suficiente para el MVP; para pagos reales conviene centavos (enteros) |
