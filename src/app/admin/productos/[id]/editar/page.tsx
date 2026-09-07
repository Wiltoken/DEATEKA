import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/products";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Editar producto",
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [categories, product] = await Promise.all([
    getAllCategories(),
    prisma.product.findUnique({
      where: { id },
      include: { images: { orderBy: { order: "asc" } } },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Editar producto</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
