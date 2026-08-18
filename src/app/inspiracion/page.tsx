import type { Metadata } from "next";
import Link from "next/link";
import { getFeaturedProducts, getPrimaryImageUrl } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export const metadata: Metadata = {
  title: "Inspiración",
};

export default async function InspiracionPage() {
  const products = await getFeaturedProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">Inspiración</h1>
        <p className="text-muted max-w-lg mx-auto">
          Ideas para transformar tus espacios. Mirá cómo combinan nuestras
          piezas y encontrá el estilo que va con vos.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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

      <div className="text-center mt-16">
        <Link
          href="/productos"
          className="bg-primary text-white px-8 py-3 font-medium hover:bg-primary-dark transition-colors"
        >
          Ver toda la tienda
        </Link>
      </div>
    </div>
  );
}
