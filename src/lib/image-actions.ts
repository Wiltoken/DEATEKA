"use server";

import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export type UploadResult = {
  error?: string;
  url?: string;
  id?: string;
};

export async function uploadProductImage(
  _prevState: UploadResult,
  formData: FormData
): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file") as File | null;
  const productId = formData.get("productId") as string | null;

  if (!file || file.size === 0) {
    return { error: "Seleccioná un archivo de imagen." };
  }

  if (!productId) {
    return { error: "ID de producto no proporcionado." };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return { error: "Formato no soportado. Usá JPG, PNG, WebP o AVIF." };
  }

  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { error: "La imagen no puede superar 5MB." };
  }

  try {
    const existingImages = await prisma.productImage.count({
      where: { productId },
    });

    const ext = file.name.split(".").pop() ?? "jpg";
    const blob = await put(`products/${productId}/${Date.now()}.${ext}`, file, {
      access: "public",
      contentType: file.type,
    });

    const image = await prisma.productImage.create({
      data: {
        url: blob.url,
        alt: file.name.replace(/\.[^.]+$/, ""),
        isPrimary: existingImages === 0,
        order: existingImages,
        productId,
      },
    });

    revalidatePath(`/admin/productos/${productId}/editar`);
    revalidatePath("/admin/productos");

    return { url: blob.url, id: image.id };
  } catch (e) {
    return { error: "Error al subir la imagen. Intentá de nuevo." };
  }
}

export async function deleteProductImage(imageId: string, productId: string) {
  await requireAdmin();

  const image = await prisma.productImage.findUnique({ where: { id: imageId } });
  if (!image) return;

  // Delete from Vercel Blob
  try {
    await del(image.url);
  } catch {
    // Blob might already be deleted, continue
  }

  await prisma.productImage.delete({ where: { id: imageId } });

  // If deleted image was primary, make the first remaining image primary
  if (image.isPrimary) {
    const next = await prisma.productImage.findFirst({
      where: { productId },
      orderBy: { order: "asc" },
    });
    if (next) {
      await prisma.productImage.update({
        where: { id: next.id },
        data: { isPrimary: true },
      });
    }
  }

  revalidatePath(`/admin/productos/${productId}/editar`);
  revalidatePath("/admin/productos");
}

export async function setPrimaryImage(imageId: string, productId: string) {
  await requireAdmin();

  await prisma.productImage.updateMany({
    where: { productId },
    data: { isPrimary: false },
  });

  await prisma.productImage.update({
    where: { id: imageId },
    data: { isPrimary: true },
  });

  revalidatePath(`/admin/productos/${productId}/editar`);
}
