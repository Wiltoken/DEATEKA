import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts, getNewProducts, getPrimaryImageUrl } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export default async function Home() {
  const [featured, news] = await Promise.all([
    getFeaturedProducts(),
    getNewProducts(),
  ]);

  return (
    <div>
      <section className="relative bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
          <p className="text-accent uppercase tracking-widest text-sm mb-4">
            Nueva colección 2026
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
            Muebles con carácter para espacios únicos
          </h1>
          <p className="text-white/70 mt-6 max-w-xl text-lg">
            Diseño atrevido, materiales nobles y piezas que cuentan una
            historia. Transformá tu hogar con DEATEKA.
          </p>
          <div className="flex gap-4 mt-10">
            <Link
              href="/productos"
              className="bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition-colors"
            >
              Ver tienda
            </Link>
            <Link
              href="/habitaciones"
              className="border border-white/30 px-8 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              Por ambiente
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Destacados</h2>
            <p className="text-muted mt-1">Nuestras piezas favoritas de la temporada</p>
          </div>
          <Link
            href="/productos"
            className="flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
          >
            Ver todo <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map((product) => (
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
      </section>

      <section className="bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Novedades</h2>
              <p className="text-muted mt-1">Lo último que llegó a la tienda</p>
            </div>
            <Link
              href="/productos?order=mas-nuevo"
              className="flex items-center gap-1 text-sm text-primary hover:gap-2 transition-all"
            >
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {news.map((product) => (
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
        </div>
      </section>
    </div>
  );
}
