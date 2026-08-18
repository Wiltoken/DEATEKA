import Link from "next/link";
import { logout } from "@/lib/auth-actions";
import { requireAdmin } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div>
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/admin" className="text-sm font-medium">
            Panel de administración
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted">{session.name}</span>
            <form action={logout}>
              <button
                type="submit"
                className="text-sm text-muted hover:text-primary transition-colors"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
