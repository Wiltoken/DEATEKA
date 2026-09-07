import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Entregado", color: "bg-green-100 text-green-800" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800" },
};

export default async function OrdersPage() {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product: { select: { name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Órdenes</h1>
          <p className="text-muted mt-1">{orders.length} pedidos totales</p>
        </div>
        <Link
          href="/admin"
          className="border border-border px-4 py-2 text-sm hover:bg-card transition-colors"
        >
          Volver al panel
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="border border-border bg-card p-12 text-center">
          <p className="text-muted text-lg mb-2">No hay órdenes todavía</p>
          <p className="text-sm text-muted">
            Las órdenes aparecerán aquí cuando los clientes hagan pedidos.
          </p>
        </div>
      ) : (
        <div className="border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-border/20">
                  <th className="text-left px-4 py-3 font-medium">Pedido</th>
                  <th className="text-left px-4 py-3 font-medium">Cliente</th>
                  <th className="text-left px-4 py-3 font-medium">Productos</th>
                  <th className="text-left px-4 py-3 font-medium">Total</th>
                  <th className="text-left px-4 py-3 font-medium">Estado</th>
                  <th className="text-left px-4 py-3 font-medium">Fecha</th>
                  <th className="text-left px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const status = statusLabels[order.status] ?? { label: order.status, color: "bg-gray-100 text-gray-800" };
                  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);
                  return (
                    <tr key={order.id} className="border-b border-border last:border-b-0 hover:bg-border/10 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs">
                        #DEA-{order.id.slice(-8).toUpperCase()}
                      </td>
                      <td className="px-4 py-3">
                        <div>{order.user.name}</div>
                        <div className="text-xs text-muted">{order.user.email}</div>
                      </td>
                      <td className="px-4 py-3 text-muted">
                        {itemCount} {itemCount === 1 ? "producto" : "productos"}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        ${order.total.toLocaleString("es-CO")}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted text-xs">
                        {new Date(order.createdAt).toLocaleDateString("es-CO", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/ordenes/${order.id}`}
                          className="text-primary hover:text-primary-dark text-sm font-medium"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
