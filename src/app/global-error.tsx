"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es-CO">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-lg mx-auto px-4 py-20 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Algo salió mal</h1>
            <p className="text-muted mb-8">
              {error.message || "Ocurrió un error inesperado."}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={reset}
                className="bg-primary text-white px-6 py-2 font-medium hover:bg-primary-dark transition-colors"
              >
                Intentar de nuevo
              </button>
              <Link
                href="/"
                className="border border-border px-6 py-2 font-medium hover:bg-card transition-colors"
              >
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
