"use client";

import Link from "next/link";
import { ArrowLeft, Heart, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{ slug: string }>;
};

export default function ProductPage({ params }: Props) {
  return <ProductContent slug={params} />;
}

function ProductContent({ slug }: { slug: Promise<{ slug: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, hasItem } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Volver a la tienda
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-border/20 flex items-center justify-center text-muted">
          [Imagen del producto]
        </div>

        <div>
          <span className="text-xs text-muted uppercase tracking-wider">
            Categoría
          </span>
          <h1 className="text-3xl font-bold mt-2">Nombre del producto</h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-bold text-primary">
              $899.000
            </span>
            <span className="text-sm text-muted line-through">
              $1.200.000
            </span>
            <span className="text-sm text-accent font-medium">
              -25%
            </span>
          </div>

          <p className="text-muted mt-6 leading-relaxed">
            Descripción detallada del producto. Materiales, dimensiones y
            características principales del mueble.
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <span className="text-sm font-medium">Color:</span>
              <span className="text-sm text-muted ml-2">Negro / Madera</span>
            </div>
            <div>
              <span className="text-sm font-medium">Material:</span>
              <span className="text-sm text-muted ml-2">Madera maciza</span>
            </div>
            <div>
              <span className="text-sm font-medium">Dimensiones:</span>
              <span className="text-sm text-muted ml-2">120×60×45 cm</span>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:text-primary transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 min-w-[3rem] text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:text-primary transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() =>
                addItem({
                  productId: "demo",
                  name: "Nombre del producto",
                  price: 899000,
                  image: "",
                })
              }
            >
              Agregar al carrito
            </Button>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
              onClick={() => toggle("demo")}
            >
              <Heart
                size={16}
                className={hasItem("demo") ? "fill-red-500 text-red-500" : ""}
              />
              {hasItem("demo") ? "En favoritos" : "Agregar a favoritos"}
            </button>
            <button className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors">
              <Share2 size={16} /> Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
