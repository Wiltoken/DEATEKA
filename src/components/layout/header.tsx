"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { useCartStore } from "@/store/cart";

const categories = [
  { name: "Muebles", href: "/productos?categoria=muebles" },
  { name: "Iluminación", href: "/productos?categoria=iluminacion" },
  { name: "Decoración", href: "/productos?categoria=decoracion" },
  { name: "Habitaciones", href: "/habitaciones" },
  { name: "Inspiración", href: "/inspiracion" },
  { name: "Bestsellers", href: "/productos?bestseller=true" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="bg-secondary text-white text-center text-xs py-2 px-4">
        Envío gratis en pedidos superiores a $500.000 ·{" "}
        <Link href="/productos" className="underline">
          Ver más
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <button
            className="lg:hidden p-2 -ml-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link href="/" className="text-2xl font-bold tracking-tight">
            DEATEKA
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:block p-2 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link
              href="/login"
              className="hidden sm:flex items-center gap-2 border border-border px-4 py-2 text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            >
              <User size={16} />
              <span>Iniciar sesión</span>
            </Link>
            <button className="p-2 hover:text-primary transition-colors">
              <Heart size={20} />
            </button>
            <Link href="/carrito" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="block py-3 text-sm hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="flex items-center gap-2 mt-4 px-4 py-3 border border-border text-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              <User size={16} />
              <span>Iniciar sesión</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
