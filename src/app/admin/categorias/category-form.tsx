"use client";

import { useState, useTransition } from "react";
import { saveCategory } from "@/app/admin/actions";

const field =
  "w-full border border-border bg-card px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

type Category = {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
};

type ParentCategory = {
  id: string;
  name: string;
};

export function CategoryForm({
  category,
  parentCategories,
}: {
  category?: Category;
  parentCategories: ParentCategory[];
}) {
  const isEdit = !!category?.id;
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await saveCategory(undefined as never, formData);
        if (result?.error) {
          setError(result.error);
        } else {
          window.location.href = "/admin/categorias";
        }
      } catch {
        window.location.href = "/admin/categorias";
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {category?.id && <input type="hidden" name="id" value={category.id} />}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div>
        <label className="block text-sm mb-1">Nombre *</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={category?.name ?? ""}
          className={field}
          placeholder="Nombre de la categoría"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Slug</label>
        <input
          name="slug"
          type="text"
          defaultValue={category?.slug ?? ""}
          className={field}
          placeholder="Se genera automáticamente si se deja vacío"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Descripción</label>
        <input
          name="description"
          type="text"
          defaultValue={category?.description ?? ""}
          className={field}
          placeholder="Descripción opcional"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Categoría padre</label>
        <select
          name="parentId"
          defaultValue={category?.parentId ?? ""}
          className={field}
        >
          <option value="">Ninguna (categoría raíz)</option>
          {parentCategories.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {pending ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear categoría"}
        </button>
        <a
          href="/admin/categorias"
          className="border border-border px-5 py-2.5 text-sm hover:bg-card transition-colors"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}
