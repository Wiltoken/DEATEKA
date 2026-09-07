"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export type OrderState = {
  error: string;
  success: boolean;
  orderId: string;
};

export type OrderItemInput = {
  productId: string;
  quantity: number;
  price: number;
};

export async function createOrder(
  _prevState: OrderState,
  formData: FormData
): Promise<OrderState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();
  const itemsJson = String(formData.get("items") ?? "[]");

  if (!name || !email || !phone || !address || !city) {
    return { error: "Completá todos los campos obligatorios.", success: false, orderId: "" };
  }

  let items: OrderItemInput[];
  try {
    items = JSON.parse(itemsJson);
  } catch {
    return { error: "Error al procesar los productos del carrito.", success: false, orderId: "" };
  }

  if (!items.length) {
    return { error: "El carrito está vacío.", success: false, orderId: "" };
  }

  let userId: string;
  const session = await getSession();

  if (session) {
    userId = session.userId;
  } else {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      userId = existingUser.id;
    } else {
      const randomPassword = await bcrypt.hash(crypto.randomUUID(), 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: randomPassword,
          role: "customer",
        },
      });
      userId = newUser.id;
    }
  }

  const productIds = items.map((i) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  let total = 0;
  const orderItems: Array<{ productId: string; quantity: number; price: number }> = [];

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return { error: `Producto no encontrado: ${item.productId}`, success: false, orderId: "" };
    }
    if (product.stock < item.quantity) {
      return { error: `Stock insuficiente para "${product.name}". Disponible: ${product.stock}`, success: false, orderId: "" };
    }
    total += product.price * item.quantity;
    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        total,
        address,
        city,
        phone,
        notes: notes || null,
        items: {
          create: orderItems,
        },
      },
    });

    for (const item of orderItems) {
      const updated = await tx.product.updateMany({
        where: {
          id: item.productId,
          stock: { gte: item.quantity },
        },
        data: { stock: { decrement: item.quantity } },
      });
      if (updated.count === 0) {
        throw new Error(`Stock insuficiente para el producto ${item.productId}`);
      }
    }

    return newOrder;
  });

  return { error: "", success: true, orderId: order.id };
}
