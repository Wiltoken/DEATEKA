"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateOrderStatus } from "@/app/admin/actions";

const statuses = [
  { value: "pending", label: "Pendiente" },
  { value: "confirmed", label: "Confirmado" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
];

export function UpdateOrderStatus({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(value: string) {
    startTransition(async () => {
      await updateOrderStatus(orderId, value);
      router.refresh();
    });
  }

  return (
    <select
      defaultValue={currentStatus}
      onChange={(e) => handleChange(e.target.value)}
      disabled={pending}
      className="border border-border bg-card px-3 py-2 text-sm outline-none disabled:opacity-50"
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>{s.label}</option>
      ))}
    </select>
  );
}
