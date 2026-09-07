import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { UpdateOrderStatus } from "./update-status";

type Props = {
  params: Promise<{ id: string }>;
};

const statusLabels: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmado",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export default async function OrderDetailPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      items: {
        include: { product: { select: { name: true, slug: true, images: { where: { isPrimary: true }, take: 1 } } } },
      },
    },
  });

  if (!order) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/admin" className="hover:text-primary transition-colors">Panel</Link>
        <span>/</span>
        <Link href="/admin/ordenes" className="hover:text-primary transition-colors">Órdenes</Link>
        <span>/</span>
        <span className="text-foreground font-mono">#DEA-{order.id.slice(-8).toUpperCase()}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Orden #DEA-{order.id.slice(-8).toUpperCase()}</h1>
          <p className="text-muted mt-1">
            {new Date(order.createdAt).toLocaleDateString("es-CO", {
              day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
            })}
          </p>
        </div>
        <UpdateOrderStatus orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Productos</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-border/20 flex-shrink-0 flex items-center justify-center text-xs text-muted overflow-hidden">
                    {item.product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.product.images[0].url} alt={item.product.name} className="w-full h-full object-cover" />
                    ) : (
                      "[IMG]"
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/admin/productos/${item.product.slug}/editar`} className="text-sm font-medium hover:text-primary transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted">
                      ${item.price.toLocaleString("es-CO")} × {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-sm">
                    ${(item.price * item.quantity).toLocaleString("es-CO")}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold">
              <span>Total</span>
              <span>${order.total.toLocaleString("es-CO")}</span>
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Dirección de envío</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Dirección:</span> {order.address}</p>
              <p><span className="text-muted">Ciudad:</span> {order.city}</p>
              <p><span className="text-muted">Teléfono:</span> {order.phone}</p>
              {order.notes && <p><span className="text-muted">Notas:</span> {order.notes}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Cliente</h2>
            <div className="space-y-2 text-sm">
              <p><span className="text-muted">Nombre:</span> {order.user.name}</p>
              <p><span className="text-muted">Email:</span> {order.user.email}</p>
              {order.user.phone && <p><span className="text-muted">Teléfono:</span> {order.user.phone}</p>}
            </div>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="font-semibold mb-4">Resumen</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Productos</span>
                <span>{order.items.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Estado</span>
                <span>{statusLabels[order.status] ?? order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Creada</span>
                <span>{new Date(order.createdAt).toLocaleDateString("es-CO")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
