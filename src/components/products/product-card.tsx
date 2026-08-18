import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAt?: number | null;
  image: string;
  category: string;
  isNew?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  compareAt,
  image,
  category,
  isNew,
  className,
}: ProductCardProps) {
  const discount = compareAt
    ? Math.round(((compareAt - price) / compareAt) * 100)
    : 0;

  return (
    <Link href={`/productos/${slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[3/4] overflow-hidden bg-border/20 mb-4">
        <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/10 transition-colors z-10" />
        <div className="w-full h-full bg-gradient-to-br from-border/30 to-border/10 flex items-center justify-center text-muted text-sm">
          [IMG]
        </div>
        {isNew && (
          <span className="absolute top-3 left-3 z-20 bg-primary text-white text-xs px-2 py-1">
            Nuevo
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 z-20 bg-accent text-white text-xs px-2 py-1">
            -{discount}%
          </span>
        )}
      </div>
      <p className="text-xs text-muted uppercase tracking-wider mb-1">{category}</p>
      <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
        {name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">
          ${price.toLocaleString("es-CO")}
        </span>
        {compareAt && (
          <span className="text-xs text-muted line-through">
            ${compareAt.toLocaleString("es-CO")}
          </span>
        )}
      </div>
    </Link>
  );
}
