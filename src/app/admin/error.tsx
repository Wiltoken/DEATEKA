"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle size={32} className="text-red-600" />
      </div>
      <h1 className="text-2xl font-bold mb-4">Error en el panel</h1>
      <p className="text-muted mb-8">
        {error.message || "Ocurrió un error inesperado. Intentá de nuevo."}
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-2 font-medium hover:bg-primary-dark transition-colors"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/admin"
          className="border border-border px-6 py-2 font-medium hover:bg-card transition-colors"
        >
          Volver al admin
        </Link>
      </div>
    </div>
  );
}
