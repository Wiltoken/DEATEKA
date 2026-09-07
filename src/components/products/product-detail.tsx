"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Heart, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { Button } from "@/components/ui/button";

export type DetailProduct = {
  id: string;
  name: string;
  price: number;
  compareAt: number | null;
  description: string;
  color: string | null;
  material: string | null;
  dimensions: string | null;
  categoryName: string;
  image: string;
};

export function ProductDetail({ product }: { product: DetailProduct }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, hasItem } = useWishlistStore();

  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link
        href="/productos"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Volver a la tienda
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square bg-border/20 flex items-center justify-center text-muted relative">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            "[Imagen del producto]"
          )}
        </div>

        <div>
          <span className="text-xs text-muted uppercase tracking-wider">
            {product.categoryName}
          </span>
          <h1 className="text-3xl font-bold mt-2">{product.name}</h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toLocaleString("es-CO")}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted line-through">
                ${product.compareAt.toLocaleString("es-CO")}
              </span>
            )}
            {discount > 0 && (
              <span className="text-sm text-accent font-medium">-{discount}%</span>
            )}
          </div>

          <p className="text-muted mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-8 space-y-4">
            {product.color && (
              <div>
                <span className="text-sm font-medium">Color:</span>
                <span className="text-sm text-muted ml-2">{product.color}</span>
              </div>
            )}
            {product.material && (
              <div>
                <span className="text-sm font-medium">Material:</span>
                <span className="text-sm text-muted ml-2">{product.material}</span>
              </div>
            )}
            {product.dimensions && (
              <div>
                <span className="text-sm font-medium">Dimensiones:</span>
                <span className="text-sm text-muted ml-2">{product.dimensions}</span>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:text-primary transition-colors"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>
              <span className="px-4 min-w-[3rem] text-center text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:text-primary transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() =>
                addItem({
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
            >
              Agregar al carrito
            </Button>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
              onClick={() => toggle(product.id)}
            >
              <Heart
                size={16}
                className={hasItem(product.id) ? "fill-red-500 text-red-500" : ""}
              />
              {hasItem(product.id) ? "En favoritos" : "Agregar a favoritos"}
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
