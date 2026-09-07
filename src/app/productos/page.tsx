import Link from "next/link";
import { getPrimaryImageUrl, getProducts, getRootCategories } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

type Props = {
  searchParams: Promise<{ categoria?: string; bestseller?: string; order?: string; page?: string }>;
};

const sortOptions = [
  { value: "", label: "Más relevante" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
  { value: "mas-nuevo", label: "Más nuevo" },
];

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeCategory = params.categoria;
  const page = params.page ? parseInt(params.page, 10) : 1;

  const [categories, result] = await Promise.all([
    getRootCategories(),
    getProducts({ ...params, page }),
  ]);

  const { products, pagination } = result;

  function buildPageUrl(p: number) {
    const sp = new URLSearchParams();
    if (activeCategory) sp.set("categoria", activeCategory);
    if (params.bestseller === "true") sp.set("bestseller", "true");
    if (params.order) sp.set("order", params.order);
    if (p > 1) sp.set("page", String(p));
    const qs = sp.toString();
    return `/productos${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {activeCategory
            ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
            : "Tienda"}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {activeCategory
          ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
          : "Todos los productos"}
      </h1>
      <p className="text-muted mb-10">
        {activeCategory
          ? `Explorá nuestra colección de ${activeCategory.toLowerCase()}`
          : "Descubrí nuestra colección completa"}
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="border border-border p-6 bg-card">
            <h3 className="font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos"
                  className={`text-sm block py-1 transition-colors ${
                    !activeCategory
                      ? "text-primary font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Todos
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/productos?categoria=${cat.slug}`}
                    className={`text-sm block py-1 transition-colors ${
                      activeCategory === cat.slug
                        ? "text-primary font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/productos?bestseller=true"
                  className={`text-sm block py-1 transition-colors ${
                    params.bestseller === "true"
                      ? "text-primary font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Bestsellers
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">{pagination.total} productos</p>
            <form method="GET" action="/productos" className="flex items-center gap-2">
              {activeCategory && (
                <input type="hidden" name="categoria" value={activeCategory} />
              )}
              {params.bestseller === "true" && (
                <input type="hidden" name="bestseller" value="true" />
              )}
              <select
                name="order"
                defaultValue={params.order ?? ""}
                className="text-sm border border-border bg-card px-3 py-2 outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </form>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-20 border border-border bg-card">
              <p className="text-muted text-lg mb-2">No hay productos todavía</p>
              <p className="text-sm text-muted">
                Probá con otra categoría o volvé más tarde.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    compareAt={product.compareAt}
                    image={getPrimaryImageUrl(product.images)}
                    category={product.category.name}
                    isNew={product.isNew}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {page > 1 && (
                    <Link
                      href={buildPageUrl(page - 1)}
                      className="border border-border px-4 py-2 text-sm hover:bg-card transition-colors"
                    >
                      Anterior
                    </Link>
                  )}
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter((p) => Math.abs(p - page) <= 2 || p === 1 || p === pagination.totalPages)
                    .reduce<(number | "...")[]>((acc, p, i, arr) => {
                      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                      acc.push(p);
                      return acc;
                    }, [])
                    .map((p, i) =>
                      p === "..." ? (
                        <span key={`dots-${i}`} className="px-2 text-muted">
                          ...
                        </span>
                      ) : (
                        <Link
                          key={p}
                          href={buildPageUrl(p as number)}
                          className={`px-4 py-2 text-sm border transition-colors ${
                            p === page
                              ? "bg-primary text-white border-primary"
                              : "border-border hover:bg-card"
                          }`}
                        >
                          {p}
                        </Link>
                      )
                    )}
                  {page < pagination.totalPages && (
                    <Link
                      href={buildPageUrl(page + 1)}
                      className="border border-border px-4 py-2 text-sm hover:bg-card transition-colors"
                    >
                      Siguiente
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
