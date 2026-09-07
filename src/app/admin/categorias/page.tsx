import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { Plus } from "lucide-react";
import { DeleteCategoryButton } from "./delete-button";

export default async function CategoriesPage() {
  await requireAdmin();

  const categories = await prisma.category.findMany({
    include: {
      parent: { select: { name: true } },
      _count: { select: { products: true, children: true } },
    },
    orderBy: { name: "asc" },
  });

  const rootCategories = categories.filter((c) => !c.parentId);
  const childCategories = categories.filter((c) => c.parentId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Categorías</h1>
          <p className="text-muted mt-1">{categories.length} categorías totales</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin"
            className="border border-border px-4 py-2 text-sm hover:bg-card transition-colors"
          >
            Volver al panel
          </Link>
          <Link
            href="/admin/categorias/nueva"
            className="bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <Plus size={16} /> Nueva categoría
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {rootCategories.map((cat) => (
          <div key={cat.id} className="border border-border bg-card">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-semibold">{cat.name}</h3>
                <p className="text-xs text-muted">
                  {cat._count.products} productos · {cat._count.children} subcategorías
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/categorias/${cat.id}/editar`}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Editar
                </Link>
                <DeleteCategoryButton categoryId={cat.id} hasProducts={cat._count.products > 0} />
              </div>
            </div>
            {childCategories.filter((c) => c.parentId === cat.id).length > 0 && (
              <div className="divide-y divide-border">
                {childCategories
                  .filter((c) => c.parentId === cat.id)
                  .map((child) => (
                    <div key={child.id} className="flex items-center justify-between px-6 py-3 pl-12">
                      <div>
                        <span className="text-sm">{child.name}</span>
                        <span className="text-xs text-muted ml-2">
                          {child._count.products} productos
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/categorias/${child.id}/editar`}
                          className="text-sm text-primary hover:text-primary-dark"
                        >
                          Editar
                        </Link>
                        <DeleteCategoryButton categoryId={child.id} hasProducts={child._count.products > 0} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
