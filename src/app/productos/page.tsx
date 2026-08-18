import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  searchParams: Promise<{ categoria?: string; bestseller?: string; order?: string }>;
};

const categories = [
  "Muebles",
  "Iluminación",
  "Decoración",
  "Exterior",
  "Habitaciones",
  "Bestsellers",
];

const filters = [
  { name: "Precio", options: ["$0 - $500.000", "$500.000 - $1.000.000", "$1.000.000+"] },
  { name: "Color", options: ["Negro", "Blanco", "Madera", "Gris", "Beige"] },
  { name: "Material", options: ["Madera", "Metal", "Vidrio", "Textil", "Mármol"] },
];

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const activeCategory = params.categoria;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/" className="hover:text-primary transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-foreground">
          {activeCategory ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : "Tienda"}
        </span>
      </div>

      <h1 className="text-3xl font-bold mb-2">
        {activeCategory
          ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)
          : "Todos los productos"}
      </h1>
      <p className="text-muted mb-10">
        {activeCategory
          ? `Explorá nuestra colección de ${activeCategory.toLowerCase()}`
          : "Descubrí nuestra colección completa"}
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-64 flex-shrink-0">
          <div className="border border-border p-6 bg-card">
            <h3 className="font-semibold mb-4">Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/productos"
                  className={`text-sm block py-1 transition-colors ${
                    !activeCategory ? "text-primary font-medium" : "text-muted hover:text-foreground"
                  }`}
                >
                  Todos
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/productos?categoria=${cat.toLowerCase()}`}
                    className={`text-sm block py-1 transition-colors ${
                      activeCategory === cat.toLowerCase()
                        ? "text-primary font-medium"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {filters.map((filter) => (
            <div key={filter.name} className="border border-border border-t-0 p-6 bg-card">
              <h3 className="font-semibold mb-4">{filter.name}</h3>
              <ul className="space-y-2">
                {filter.options.map((opt) => (
                  <li key={opt}>
                    <label className="flex items-center gap-2 text-sm text-muted cursor-pointer hover:text-foreground transition-colors">
                      <input type="checkbox" className="accent-primary" />
                      {opt}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted">0 productos</p>
            <select className="text-sm border border-border bg-card px-3 py-2 outline-none">
              <option>Más relevante</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Más nuevo</option>
            </select>
          </div>

          <div className="text-center py-20 border border-border bg-card">
            <p className="text-muted text-lg mb-2">No hay productos todavía</p>
            <p className="text-sm text-muted">
              Pronto vas a poder ver nuestra colección completa acá.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
