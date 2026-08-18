import type { Metadata } from "next";
import { getAllCategories } from "@/lib/products";
import { ProductForm } from "@/components/admin/product-form";

export const metadata: Metadata = {
  title: "Nuevo producto",
};

export default async function NewProductPage() {
  const categories = await getAllCategories();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Nuevo producto</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
