import type { Metadata } from "next";
import { RotateCcw, Calendar, AlertCircle, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Devoluciones",
};

const items = [
  {
    icon: RotateCcw,
    title: "30 días para devolver",
    text: "Tenés 30 días desde la entrega para devolver tu compra sin preguntas.",
  },
  {
    icon: Calendar,
    title: "Cómo funciona",
    text: "Escribinos a hola@deateka.com con tu número de pedido y coordinamos el retiro.",
  },
  {
    icon: AlertCircle,
    title: "Estado del producto",
    text: "El producto debe estar sin usar, con su empaque y etiquetas originales.",
  },
  {
    icon: CreditCard,
    title: "Reembolso",
    text: "Procesamos el reembolso por el mismo medio de pago en 5 a 10 días hábiles.",
  },
];

export default function DevolucionesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Devoluciones</h1>
      <p className="text-muted mb-10">
        Comprá tranquilo: devolvé fácil si algo no te convence.
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
