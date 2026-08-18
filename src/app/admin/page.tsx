import { Package, DollarSign, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Package, label: "Productos", value: "0" },
  { icon: DollarSign, label: "Ventas", value: "$0" },
  { icon: ShoppingCart, label: "Órdenes", value: "0" },
  { icon: Users, label: "Clientes", value: "0" },
];

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Panel de administración</h1>
          <p className="text-muted mt-1">Gestioná tu tienda</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Nuevo producto
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-card p-6"
          >
            <stat.icon size={24} className="text-primary mb-3" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-border bg-card p-8 text-center">
        <h2 className="font-semibold text-lg mb-2">Productos</h2>
        <p className="text-muted mb-4">
          No hay productos todavía. Empezá agregando el primero.
        </p>
        <Link
          href="/admin/productos/nuevo"
          className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
        >
          Agregar producto →
        </Link>
      </div>
    </div>
  );
}
