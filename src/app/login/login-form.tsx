"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";

const field =
  "w-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-colors";

const initialState: LoginState = { error: "" };

export default function LoginForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-2">Iniciar sesión</h1>
      <p className="text-muted mb-8">Acceso al panel de administración.</p>

      <form action={formAction} className="space-y-4">
        {state.error && <p className="text-red-600 text-sm">{state.error}</p>}

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            placeholder="admin@deateka.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className={field}
          />
        </div>

        <input type="hidden" name="from" value={from ?? ""} />

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </div>
  );
}
