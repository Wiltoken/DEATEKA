import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "../../category-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: Props) {
  await requireAdmin();
  const { id } = await params;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  const parentCategories = await prisma.category.findMany({
    where: { parentId: null, id: { not: id } },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Editar categoría</h1>
      <CategoryForm
        category={{
          id: category.id,
          name: category.name,
          slug: category.slug,
          description: category.description,
          parentId: category.parentId,
        }}
        parentCategories={parentCategories}
      />
    </div>
  );
}
