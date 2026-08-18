"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Carrito</h1>
      <CartContent />
    </div>
  );
}

function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const isClient = typeof window !== "undefined";

  if (!isClient || items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted text-lg mb-4">Tu carrito está vacío</p>
        <Link
          href="/productos"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
        >
          <ArrowLeft size={16} /> Seguir comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-12 mt-8">
      <div className="md:col-span-2 space-y-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 p-4 border border-border bg-card"
          >
            <div className="w-24 h-24 bg-border/20 flex-shrink-0 flex items-center justify-center text-xs text-muted">
              [IMG]
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm">{item.name}</h3>
              <p className="text-sm text-muted mt-1">
                ${item.price.toLocaleString("es-CO")}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="p-1.5 hover:text-primary transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 text-sm">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="p-1.5 hover:text-primary transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-muted hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                ${(item.price * item.quantity).toLocaleString("es-CO")}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border p-6 h-fit">
        <h3 className="font-semibold text-lg mb-4">Resumen</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Subtotal</span>
            <span>${totalPrice().toLocaleString("es-CO")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Envío</span>
            <span className="text-green-600">Gratis</span>
          </div>
        </div>
        <div className="border-t border-border mt-4 pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice().toLocaleString("es-CO")}</span>
        </div>
        <Link href="/checkout" className="block mt-6">
          <Button className="w-full">
            Ir a pagar <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
        <Link
          href="/productos"
          className="block text-center text-sm text-muted hover:text-primary transition-colors mt-4"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
