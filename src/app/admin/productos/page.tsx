import Link from "next/link";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Productos</h1>
          <p className="text-muted mt-1">{products.length} en el catálogo</p>
        </div>
        <Link
          href="/admin/productos/nuevo"
          className="bg-primary text-white px-5 py-2.5 text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-border bg-card p-12 text-center">
          <p className="text-muted mb-4">No hay productos todavía.</p>
          <Link
            href="/admin/productos/nuevo"
            className="text-primary hover:text-primary-dark transition-colors text-sm font-medium"
          >
            Agregar el primero →
          </Link>
        </div>
      ) : (
        <div className="border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-muted">Nombre</th>
                <th className="px-4 py-3 font-medium text-muted">Categoría</th>
                <th className="px-4 py-3 font-medium text-muted">Precio</th>
                <th className="px-4 py-3 font-medium text-muted">Stock</th>
                <th className="px-4 py-3 font-medium text-muted">Estado</th>
                <th className="px-4 py-3 font-medium text-muted text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-muted">{product.category.name}</td>
                  <td className="px-4 py-3">
                    ${product.price.toLocaleString("es-CO")}
                  </td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {product.isFeatured && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5">
                          Destacado
                        </span>
                      )}
                      {product.isNew && (
                        <span className="text-xs bg-accent/20 text-accent px-2 py-0.5">
                          Nuevo
                        </span>
                      )}
                      {product.isBestSeller && (
                        <span className="text-xs bg-secondary/10 px-2 py-0.5">
                          Bestseller
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        href={`/admin/productos/${product.id}/editar`}
                        className="text-muted hover:text-primary transition-colors"
                        aria-label="Editar producto"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
