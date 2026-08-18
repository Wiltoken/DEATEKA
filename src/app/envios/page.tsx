import type { Metadata } from "next";
import { Truck, Package, Clock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Envíos",
};

const items = [
  {
    icon: Truck,
    title: "Envío gratis",
    text: "En pedidos superiores a $500.000 el envío es gratis en toda Colombia.",
  },
  {
    icon: Clock,
    title: "Tiempos de entrega",
    text: "Entre 3 y 7 días hábiles según la ciudad. Recibís un número de seguimiento al despachar.",
  },
  {
    icon: Package,
    title: "Empaque protegido",
    text: "Cada mueble viaja embalado y asegurado para que llegue en perfecto estado.",
  },
  {
    icon: ShieldCheck,
    title: "Envío asegurado",
    text: "Si algo llega dañado, lo reponemos sin costo. Tu compra está protegida.",
  },
];

export default function EnviosPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Envíos</h1>
      <p className="text-muted mb-10">
        Todo lo que necesitás saber sobre cómo llega tu pedido.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.title} className="border border-border bg-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <item.icon size={20} className="text-primary" />
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
