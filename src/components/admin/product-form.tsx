import type { Category, Product, ProductImage } from "@prisma/client";
import { saveProduct } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";

type CategoryWithParent = Category & { parent: Category | null };
type ProductWithImages = Product & { images: ProductImage[] };

const field =
  "w-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

function categoryLabel(category: CategoryWithParent): string {
  return category.parent ? `${category.parent.name} / ${category.name}` : category.name;
}

export function ProductForm({
  categories,
  product,
}: {
  categories: CategoryWithParent[];
  product?: ProductWithImages;
}) {
  return (
    <div className="space-y-8">
      <form action={saveProduct} className="space-y-8">
        {product && <input type="hidden" name="id" value={product.id} />}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <input
              name="name"
              required
              defaultValue={product?.name ?? ""}
              className={field}
              placeholder="Sofá Milano"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Slug</label>
            <input
              name="slug"
              defaultValue={product?.slug ?? ""}
              className={field}
              placeholder="se genera solo desde el nombre"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Categoría</label>
            <select name="categoryId" required defaultValue={product?.categoryId ?? ""} className={field}>
              <option value="" disabled>
                Seleccioná una categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {categoryLabel(category)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              min={0}
              defaultValue={product?.stock ?? 0}
              className={field}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Precio</label>
            <input
              name="price"
              type="number"
              min={0}
              step="1"
              required
              defaultValue={product?.price ?? ""}
              className={field}
              placeholder="899000"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Precio anterior</label>
            <input
              name="compareAt"
              type="number"
              min={0}
              step="1"
              defaultValue={product?.compareAt ?? ""}
              className={field}
              placeholder="opcional"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Color</label>
            <input name="color" defaultValue={product?.color ?? ""} className={field} />
          </div>
          <div>
            <label className="block text-sm mb-1">Material</label>
            <input name="material" defaultValue={product?.material ?? ""} className={field} />
          </div>

          <div>
            <label className="block text-sm mb-1">Dimensiones</label>
            <input name="dimensions" defaultValue={product?.dimensions ?? ""} className={field} />
          </div>
          <div>
            <label className="block text-sm mb-1">Peso</label>
            <input name="weight" defaultValue={product?.weight ?? ""} className={field} />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Descripción</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ""}
            className={field}
            placeholder="Descripción detallada del producto"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={product?.isFeatured ?? false}
              className="accent-primary"
            />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="isNew"
              defaultChecked={product?.isNew ?? false}
              className="accent-primary"
            />
            Nuevo
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              name="isBestSeller"
              defaultChecked={product?.isBestSeller ?? false}
              className="accent-primary"
            />
            Bestseller
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit">{product ? "Guardar cambios" : "Crear producto"}</Button>
          <a
            href="/admin/productos"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border border-border hover:bg-border/30 transition-colors"
          >
            Cancelar
          </a>
        </div>
      </form>

      {/* Image uploader — only when editing an existing product */}
      {product && (
        <div className="border-t border-border pt-8">
          <ImageUploader productId={product.id} images={product.images} />
        </div>
      )}

      {!product && (
        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted">
            Las imágenes se pueden agregar después de crear el producto.
          </p>
        </div>
      )}
    </div>
  );
}
