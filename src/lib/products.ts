import { Prisma, type ProductImage } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export function getPrimaryImageUrl(images: ProductImage[]): string {
  return images.find((i) => i.isPrimary)?.url ?? images[0]?.url ?? "";
}

const productInclude = {
  category: true,
  images: true,
} satisfies Prisma.ProductInclude;

export function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { isFeatured: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export function getNewProducts() {
  return prisma.product.findMany({
    where: { isNew: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export function getBestSellers() {
  return prisma.product.findMany({
    where: { isBestSeller: true },
    include: productInclude,
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

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
};

const orderByMap: Record<string, Prisma.ProductOrderByWithRelationInput[]> = {
  "precio-asc": [{ price: "asc" }],
  "precio-desc": [{ price: "desc" }],
  "mas-nuevo": [{ createdAt: "desc" }],
};

export function getProducts({ categoria, bestseller, order }: ProductFilters) {
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

  return prisma.product.findMany({
    where,
    include: productInclude,
    orderBy,
  });
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
