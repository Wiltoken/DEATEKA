import Link from "next/link";
import { Mail, MapPin, Phone, Globe } from "lucide-react";

const footerCategories = [
  {
    title: "Muebles",
    links: [
      { name: "Sofás", href: "/productos?categoria=muebles" },
      { name: "Mesas", href: "/productos?categoria=muebles" },
      { name: "Sillas", href: "/productos?categoria=muebles" },
      { name: "Camas", href: "/productos?categoria=muebles" },
      { name: "Escritorios", href: "/productos?categoria=muebles" },
    ],
  },
  {
    title: "Iluminación",
    links: [
      { name: "Lámparas de techo", href: "/productos?categoria=iluminacion" },
      { name: "Lámparas de pie", href: "/productos?categoria=iluminacion" },
      { name: "Lámparas de mesa", href: "/productos?categoria=iluminacion" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { name: "Contacto", href: "/contacto" },
      { name: "Envíos", href: "/envios" },
      { name: "Devoluciones", href: "/devoluciones" },
      { name: "Preguntas frecuentes", href: "/faq" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold mb-4">DEATEKA</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Muebles y decoración con diseño único para espacios que inspiran.
            </p>
          </div>
          {footerCategories.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-sm mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Colombia
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} /> hola@deateka.com
            </span>
            <span className="flex items-center gap-2">
              <Phone size={14} /> +57 300 123 4567
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Facebook
            </Link>
            <Link href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Instagram
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-white/40 text-xs">
          &copy; {new Date().getFullYear()} DEATEKA. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
