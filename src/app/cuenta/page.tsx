import type { Metadata } from "next";
import { User, Heart, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Mi cuenta",
};

export default function CuentaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Mi cuenta</h1>
      <p className="text-muted mb-10">
        Accedé a tus pedidos, favoritos y datos personales.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border border-border bg-card p-6">
          <User size={24} className="text-primary mb-3" />
          <h3 className="font-semibold mb-1">Iniciar sesión</h3>
          <p className="text-sm text-muted">
            Entrá con tu email para ver tu historial y gestionar tu cuenta.
          </p>
        </div>
        <div className="border border-border bg-card p-6">
          <Heart size={24} className="text-primary mb-3" />
          <h3 className="font-semibold mb-1">Favoritos</h3>
          <p className="text-sm text-muted">
            Guardá tus productos favoritos para encontrarlos rápido.
          </p>
        </div>
        <div className="border border-border bg-card p-6">
          <Package size={24} className="text-primary mb-3" />
          <h3 className="font-semibold mb-1">Pedidos</h3>
          <p className="text-sm text-muted">
            Seguí el estado de tus compras desde un solo lugar.
          </p>
        </div>
      </div>

      <div className="mt-10 border border-border bg-card p-8 text-center">
        <p className="text-muted mb-4">
          El registro e inicio de sesión todavía no están disponibles.
        </p>
        <p className="text-sm text-muted">
          Mientras tanto, podés comprar como invitado. Tu carrito y favoritos
          se guardan en tu dispositivo.
        </p>
      </div>
    </div>
  );
}
