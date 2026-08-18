import { notFound } from "next/navigation";
import { getPrimaryImageUrl, getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/products/product-detail";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        price: product.price,
        compareAt: product.compareAt,
        description: product.description,
        color: product.color,
        material: product.material,
        dimensions: product.dimensions,
        categoryName: product.category.name,
        image: getPrimaryImageUrl(product.images),
      }}
    />
  );
}
