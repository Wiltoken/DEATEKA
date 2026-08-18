import Link from "next/link";
import { ArrowRight } from "lucide-react";

const rooms = [
  {
    name: "Sala de estar",
    slug: "sala",
    description: "El corazón de tu hogar merece muebles que cuenten una historia.",
    count: 84,
  },
  {
    name: "Comedor",
    slug: "comedor",
    description: "Mesas, sillas y buffets para cenas inolvidables.",
    count: 62,
  },
  {
    name: "Dormitorio",
    slug: "dormitorio",
    description: "Camas, veladores y cómodas para tu refugio personal.",
    count: 95,
  },
  {
    name: "Oficina",
    slug: "oficina",
    description: "Escritorios y sillas ergonómicas con mucho estilo.",
    count: 43,
  },
  {
    name: "Terraza y jardín",
    slug: "exterior",
    description: "Muebles de exterior que resisten y enamoran.",
    count: 56,
  },
  {
    name: "Entrada",
    slug: "entrada",
    description: "La primera impresión cuenta. Percheros, espejos y zapateros.",
    count: 28,
  },
];

export default function RoomsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">Comprar por ambiente</h1>
        <p className="text-muted max-w-lg mx-auto">
          Encontrá los muebles y accesorios perfectos para cada rincón de tu
          hogar. Seleccioná un ambiente y empezá a diseñar.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <Link
            key={room.slug}
            href={`/productos?categoria=${room.slug}`}
            className="group border border-border bg-card hover:border-primary/30 transition-colors"
          >
            <div className="aspect-[4/3] bg-border/20 flex items-center justify-center text-muted text-sm">
              [Imagen {room.name}]
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-lg mb-2">{room.name}</h3>
              <p className="text-sm text-muted mb-4">{room.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">{room.count} productos</span>
                <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                  Explorar <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
