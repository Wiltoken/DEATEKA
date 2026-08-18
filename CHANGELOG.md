# Changelog

Todas las modificaciones relevantes del proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y el proyecto adhiere a [SemVer](https://semver.org/).

## [0.1.0] — 2026-08-18

### Agregado

- Scaffold inicial del e-commerce con Next.js 16, TypeScript, Tailwind CSS v4,
  Prisma (SQLite) y Zustand.
- Esquema de base de datos (usuarios, categorías, productos, imágenes, pedidos,
  favoritos) con migración inicial y seed de 15 productos.
- Páginas de tienda: home, catálogo con filtros y orden, detalle de producto,
  comprar por ambiente, carrito y checkout.
- Carrito y favoritos con persistencia en `localStorage` (Zustand).
- Conexión de las páginas a Prisma para leer datos reales.
- Páginas estáticas: inspiración, cuenta, contacto, envíos, devoluciones y FAQ.
- Panel de administración con dashboard de estadísticas.
- CRUD de productos (crear, editar, eliminar) mediante Server Actions.
- Documentación: manuales técnico y de usuario, arquitectura y control de
  versiones.

### Corregido

- Pantalla de confirmación del checkout que no se mostraba al vaciar el carrito
  antes de confirmar.

### Pendiente

- Autenticación del panel de administración.
- Creación de pedidos reales y pasarela de pago.
- Carga de imágenes de producto.
