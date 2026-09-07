"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/admin/actions";

export function DeleteCategoryButton({ categoryId, hasProducts }: { categoryId: string; hasProducts: boolean }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (hasProducts) {
      alert("No se puede eliminar una categoría con productos.");
      return;
    }
    if (!confirm("¿Eliminar esta categoría?")) return;

    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", categoryId);
      await deleteCategory(fd);
      router.refresh();
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
    >
      {pending ? "..." : "Eliminar"}
    </button>
  );
}
