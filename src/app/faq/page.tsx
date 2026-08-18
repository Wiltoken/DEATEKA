import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
};

const faqs = [
  {
    q: "¿Hacen envíos a todo el país?",
    a: "Sí, enviamos a toda Colombia. El envío es gratis en pedidos superiores a $500.000.",
  },
  {
    q: "¿Cuánto tarda en llegar mi pedido?",
    a: "Entre 3 y 7 días hábiles según la ciudad. Recibís un número de seguimiento al despachar.",
  },
  {
    q: "¿Puedo devolver un producto?",
    a: "Sí, tenés 30 días desde la entrega. El producto debe estar sin usar y con su empaque original.",
  },
  {
    q: "¿Los muebles vienen armados?",
    a: "Algunas piezas requieren ensamblado sencillo. Cada producto indica en su ficha si incluye instrucciones.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos tarjetas de crédito y débito, transferencias y pagos en efectivo según la opción disponible al pagar.",
  },
  {
    q: "¿Cómo hago seguimiento de mi pedido?",
    a: "Te enviamos un email con el estado y el número de seguimiento apenas se despacha tu compra.",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Preguntas frecuentes</h1>
      <p className="text-muted mb-10">
        Las respuestas a las dudas más comunes.
      </p>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.q} className="border border-border bg-card p-6">
            <h3 className="font-semibold mb-2">{faq.q}</h3>
            <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
