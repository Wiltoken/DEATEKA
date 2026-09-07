import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "../category-form";

export default async function NewCategoryPage() {
  await requireAdmin();

  const parentCategories = await prisma.category.findMany({
    where: { parentId: null },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Nueva categoría</h1>
      <CategoryForm parentCategories={parentCategories} />
    </div>
  );
}
