"use client";

import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/admin/actions";

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form action={deleteProduct}>
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        onClick={(e) => {
          if (!window.confirm("¿Eliminar este producto?")) {
            e.preventDefault();
          }
        }}
        className="text-muted hover:text-red-500 transition-colors"
        aria-label="Eliminar producto"
      >
        <Trash2 size={16} />
      </button>
    </form>
  );
}
