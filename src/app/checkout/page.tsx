"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { ArrowRight, CreditCard, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { createOrder, type OrderState } from "@/lib/order-actions";
import { Button } from "@/components/ui/button";

const field =
  "w-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

const initialOrderState: OrderState = { error: "", success: false, orderId: "" };

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  const [state, formAction, pending] = useActionState(createOrder, initialOrderState);

  useEffect(() => {
    if (state.success) {
      clearCart();
    }
  }, [state.success, clearCart]);

  if (state.success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck size={32} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-4">¡Pedido confirmado!</h1>
        <p className="text-muted mb-8">
          Gracias por tu compra. Te enviaremos un email con los detalles y
          seguimiento de tu pedido.
        </p>
        <p className="text-sm text-muted mb-8">
          Número de pedido:{" "}
          <span className="font-mono font-medium">
            #DEA-{state.orderId.slice(-8).toUpperCase()}
          </span>
        </p>
        <Link
          href="/"
          className="text-primary hover:text-primary-dark transition-colors font-medium"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <p className="text-muted text-lg mb-4">No hay productos en tu carrito</p>
        <Link
          href="/productos"
          className="text-primary hover:text-primary-dark transition-colors"
        >
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form action={formAction}>
        <input type="hidden" name="items" value={JSON.stringify(items.map(i => ({
          productId: i.productId,
          quantity: i.quantity,
          price: i.price,
        })))} />

        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            {state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {state.error}
              </div>
            )}

            <div>
              <h2 className="font-semibold text-lg mb-4">Datos de contacto</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Nombre completo *</label>
                  <input
                    name="name"
                    type="text"
                    required
                    className={field}
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className={field}
                    placeholder="tu@email.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Teléfono *</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className={field}
                    placeholder="+57 300 000 0000"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-4">Dirección de envío</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm mb-1">Dirección *</label>
                  <input
                    name="address"
                    type="text"
                    required
                    className={field}
                    placeholder="Calle 123 #45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Ciudad *</label>
                  <input
                    name="city"
                    type="text"
                    required
                    className={field}
                    placeholder="Bogotá"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Notas (opcional)</label>
                  <input
                    name="notes"
                    type="text"
                    className={field}
                    placeholder="Instrucciones de entrega"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-card border border-border p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Tu pedido</h3>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-muted truncate max-w-[60%]">
                      {item.name} ×{item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString("es-CO")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>${totalPrice.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
              </div>
              <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>${totalPrice.toLocaleString("es-CO")}</span>
              </div>

              <div className="mt-6 space-y-3 text-xs text-muted">
                <div className="flex items-center gap-2">
                  <Truck size={14} /> Envío gratis en +$500.000
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} /> Pago seguro encriptado
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} /> 30 días para devoluciones
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                size="lg"
                disabled={pending}
              >
                {pending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    Confirmar pedido <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
