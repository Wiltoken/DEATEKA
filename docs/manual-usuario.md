# Manual de usuario

Guía para usar la tienda y el panel de administración de DEATEKA.

## Tienda en línea

### Navegar el catálogo

1. Desde la **home** ves las secciones *Destacados* y *Novedades*.
2. Usá el menú superior para ir a una categoría, o entrá a
   **Productos** para ver todo el catálogo.
3. En el listado podés filtrar por **categoría**, ver **bestsellers** y
   **ordenar** por precio o novedad.

### Ver un producto

Hacé clic en cualquier producto para ver su detalle: descripción, ficha
técnica (color, material, dimensiones), precio y descuento.

### Carrito

1. En el detalle, elegí la cantidad y pulsá **Agregar al carrito**.
2. El ícono del carrito (arriba a la derecha) muestra cuántos artículos hay.
3. En **Carrito** podés cambiar cantidades o quitar productos.

### Favoritos

Pulsá el corazón en el detalle del producto para guardarlo o quitarlo de
favoritos.

### Comprar (checkout)

1. Desde el carrito, pulsá **Ir a pagar**.
2. Completá los datos de contacto y envío.
3. Revisá el resumen y pulsá **Confirmar pedido**.

> En esta versión el pedido no se envía a ningún sistema de pago: es un
> flujo de demostración.

## Panel de administración

Acceso: `/admin`.

### Iniciar sesión

1. Entrá a `/login`.
2. Ingresá el email y la contraseña del administrador.
3. Serás redirigido al panel.

Para **cerrar sesión**, usá el botón **Cerrar sesión** en la barra superior
del panel.

### Dashboard

Muestra estadísticas en tiempo real: cantidad de productos, ventas, órdenes y
clientes.

### Gestionar productos

1. Entrá a **Ver productos** (o `/admin/productos`).
2. El listado muestra nombre, categoría, precio, stock y estado de cada
   producto.

### Crear un producto

1. Pulsá **Nuevo producto**.
2. Completá el formulario:

| Campo | Obligatorio | Nota |
|-------|-------------|------|
| Nombre | Sí | — |
| Slug | No | Se genera automáticamente desde el nombre |
| Categoría | Sí | Lista jerárquica (ej. *Muebles / Mesas*) |
| Stock | No | 0 por defecto |
| Precio | Sí | En pesos colombianos |
| Precio anterior | No | Para mostrar descuento |
| Color, material, dimensiones, peso | No | Ficha técnica |
| Descripción | No | — |
| Destacado / Nuevo / Bestseller | No | Controlan las secciones de la home |

3. Pulsá **Crear producto**. Volverás al listado.

### Editar un producto

1. En el listado, pulsá el ícono de lápiz.
2. Modificá los campos y pulsá **Guardar cambios**.

### Eliminar un producto

En el listado, pulsá el ícono de papelera y confirmá la acción.

## Preguntas frecuentes

Para dudas de uso general, ver la página `/faq`. Para devoluciones y envíos,
ver `/envios` y `/devoluciones`.
