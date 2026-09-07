import { Package, DollarSign, ShoppingCart, Users, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [productCount, orderCount, customerCount, sales, pendingOrders, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count({ where: { role: "customer" } }),
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.count({ where: { status: "pending" } }),
    prisma.category.count(),
  ]);

  const totalSales = sales._sum.total ?? 0;

  const stats = [
    { icon: Package, label: "Productos", value: productCount.toLocaleString("es-CO"), href: "/admin/productos" },
    {
      icon: DollarSign,
      label: "Ventas",
      value: `$${totalSales.toLocaleString("es-CO")}`,
    },
    { icon: ShoppingCart, label: "Órdenes", value: orderCount.toLocaleString("es-CO"), href: "/admin/ordenes", badge: pendingOrders > 0 ? `${pendingOrders} pendientes` : undefined },
    { icon: Users, label: "Clientes", value: customerCount.toLocaleString("es-CO") },
    { icon: LayoutGrid, label: "Categorías", value: categoryCount.toLocaleString("es-CO"), href: "/admin/categorias" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Panel de administración</h1>
          <p className="text-muted mt-1">Gestioná tu tienda</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/ordenes"
            className="border border-border px-5 py-2.5 text-sm font-medium hover:bg-border/30 transition-colors"
          >
            Órdenes
          </Link>
          <Link
            href="/admin/categorias"
            className="border border-border px-5 py-2.5 text-sm font-medium hover:bg-border/30 transition-colors"
          >
            Categorías
          </Link>
          <Link
            href="/admin/productos/nuevo"
            className="bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Nuevo producto
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-border bg-card p-6">
            <stat.icon size={24} className="text-primary mb-3" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
            {stat.badge && (
              <p className="text-xs text-yellow-600 mt-1 font-medium">{stat.badge}</p>
            )}
            {"href" in stat && stat.href && (
              <Link href={stat.href} className="text-xs text-primary hover:text-primary-dark mt-2 inline-block">
                Ver →
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border bg-card p-8">
          <h2 className="font-semibold text-lg mb-2">Productos</h2>
          <p className="text-muted mb-4">
            {productCount > 0
              ? `Tenés ${productCount} productos en tu catálogo.`
              : "No hay productos todavía. Empezá agregando el primero."}
          </p>
          <div className="flex gap-3">
            <Link
              href="/admin/productos"
              className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
            >
              Ver productos →
            </Link>
            <Link
              href="/admin/productos/nuevo"
              className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
            >
              Agregar →
            </Link>
          </div>
        </div>

        <div className="border border-border bg-card p-8">
          <h2 className="font-semibold text-lg mb-2">Órdenes recientes</h2>
          <p className="text-muted mb-4">
            {pendingOrders > 0
              ? `Tenés ${pendingOrders} órdenes pendientes de procesar.`
              : orderCount > 0
                ? "No hay órdenes pendientes por ahora."
                : "Aún no hay órdenes."}
          </p>
          {orderCount > 0 && (
            <Link
              href="/admin/ordenes"
              className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
            >
              Ver órdenes →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
