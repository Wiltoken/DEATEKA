"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { requireAdmin } from "@/lib/auth";

function getString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export type CategoryState = {
  error: string;
};

function getNumber(formData: FormData, key: string): number | null {
  const raw = getString(formData, key);
  if (raw === "") return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function getBoolean(formData: FormData, key: string): boolean {
  return formData.get(key) === "on";
}

function nullable(value: string): string | null {
  return value.trim() === "" ? null : value;
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  const name = getString(formData, "name").trim();
  const slug = getString(formData, "slug").trim() || slugify(name);
  const description = getString(formData, "description");
  const price = getNumber(formData, "price");
  const compareAt = getNumber(formData, "compareAt");
  const stock = getNumber(formData, "stock") ?? 0;
  const categoryId = getString(formData, "categoryId");

  if (!name || price === null || !categoryId) {
    throw new Error("Nombre, precio y categoría son obligatorios.");
  }

  const data = {
    name,
    slug,
    description,
    price,
    compareAt,
    stock,
    categoryId,
    color: nullable(getString(formData, "color")),
    material: nullable(getString(formData, "material")),
    dimensions: nullable(getString(formData, "dimensions")),
    weight: nullable(getString(formData, "weight")),
    isFeatured: getBoolean(formData, "isFeatured"),
    isNew: getBoolean(formData, "isNew"),
    isBestSeller: getBoolean(formData, "isBestSeller"),
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
  redirect("/admin/productos");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  await prisma.product.delete({ where: { id } });

  revalidatePath("/admin/productos");
  revalidatePath("/productos");
  revalidatePath("/");
}

export async function updateOrderStatus(orderId: string, status: string) {
  await requireAdmin();

  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });

  revalidatePath(`/admin/ordenes/${orderId}`);
  revalidatePath("/admin/ordenes");
}

export async function saveCategory(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  const name = getString(formData, "name").trim();
  const slug = getString(formData, "slug").trim() || slugify(name);
  const description = nullable(getString(formData, "description"));
  const parentId = getString(formData, "parentId") || null;

  if (!name) {
    throw new Error("El nombre es obligatorio.");
  }

  const data = { name, slug, description, parentId };

  if (id) {
    await prisma.category.update({ where: { id }, data });
  } else {
    await prisma.category.create({ data });
  }

  revalidatePath("/admin/categorias");
  revalidatePath("/admin");
  redirect("/admin/categorias");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();

  const id = getString(formData, "id");
  if (!id) return;

  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) {
    throw new Error("No se puede eliminar una categoría con productos.");
  }

  await prisma.category.delete({ where: { id } });

  revalidatePath("/admin/categorias");
  revalidatePath("/admin");
}
