import { unstable_cache, revalidatePath } from "next/cache";
import { Prisma, type ProductImage } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function getPrimaryImageUrl(images: ProductImage[]): string {
  return images.find((i) => i.isPrimary)?.url ?? images[0]?.url ?? "";
}

export function revalidateProducts() {
  revalidatePath("/productos");
  revalidatePath("/");
}

const productInclude = {
  category: true,
  images: true,
} satisfies Prisma.ProductInclude;

export const getFeaturedProducts = unstable_cache(
  () =>
    prisma.product.findMany({
      where: { isFeatured: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ["products", "featured"],
  { revalidate: 60, tags: ["products"] }
);

export const getNewProducts = unstable_cache(
  () =>
    prisma.product.findMany({
      where: { isNew: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ["products", "new"],
  { revalidate: 60, tags: ["products"] }
);

export const getBestSellers = unstable_cache(
  () =>
    prisma.product.findMany({
      where: { isBestSeller: true },
      include: productInclude,
      orderBy: { createdAt: "desc" },
      take: 8,
    }),
  ["products", "bestsellers"],
  { revalidate: 60, tags: ["products"] }
);

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}

export type ProductFilters = {
  categoria?: string;
  bestseller?: string;
  order?: string;
  page?: number;
};

const orderByMap: Record<string, Prisma.ProductOrderByWithRelationInput[]> = {
  "precio-asc": [{ price: "asc" }],
  "precio-desc": [{ price: "desc" }],
  "mas-nuevo": [{ createdAt: "desc" }],
};

const PAGE_SIZE = 20;

export async function getProducts({ categoria, bestseller, order, page }: ProductFilters) {
  const where: Prisma.ProductWhereInput = {};

  if (bestseller === "true") {
    where.isBestSeller = true;
  }

  if (categoria) {
    where.OR = [
      { category: { slug: categoria } },
      { category: { parent: { slug: categoria } } },
    ];
  }

  const orderBy = orderByMap[order ?? ""] ?? [{ createdAt: "desc" }];
  const currentPage = Math.max(1, page ?? 1);
  const skip = (currentPage - 1) * PAGE_SIZE;

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      skip,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    pagination: {
      page: currentPage,
      pageSize: PAGE_SIZE,
      total,
      totalPages: Math.ceil(total / PAGE_SIZE),
    },
  };
}

export function getRootCategories() {
  return prisma.category.findMany({
    where: { parentId: null },
    orderBy: { name: "asc" },
  });
}

export function getAllCategories() {
  return prisma.category.findMany({
    include: { parent: true },
    orderBy: { name: "asc" },
  });
}
