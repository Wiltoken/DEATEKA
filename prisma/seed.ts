import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.wishlistItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const muebles = await prisma.category.create({
    data: {
      name: "Muebles",
      slug: "muebles",
      description: "Muebles de diseño para todos los ambientes",
      children: {
        create: [
          { name: "Sofás", slug: "sofas", description: "Sofás y sillones" },
          { name: "Mesas", slug: "mesas", description: "Mesas de comedor y centro" },
          { name: "Sillas", slug: "sillas", description: "Sillas de comedor y escritorio" },
          { name: "Camas", slug: "camas", description: "Camas y bases" },
        ],
      },
    },
  });

  const iluminacion = await prisma.category.create({
    data: {
      name: "Iluminación",
      slug: "iluminacion",
      description: "Lámparas y accesorios de iluminación",
      children: {
        create: [
          { name: "Lámparas de techo", slug: "lamparas-techo", description: "Lámparas colgantes y de techo" },
          { name: "Lámparas de pie", slug: "lamparas-pie", description: "Lámparas de pie decorativas" },
          { name: "Lámparas de mesa", slug: "lamparas-mesa", description: "Lámparas de escritorio y veladores" },
        ],
      },
    },
  });

  const decoracion = await prisma.category.create({
    data: {
      name: "Decoración",
      slug: "decoracion",
      description: "Accesorios decorativos para tu hogar",
      children: {
        create: [
          { name: "Cuadros", slug: "cuadros", description: "Cuadros y arte mural" },
          { name: "Espejos", slug: "espejos", description: "Espejos decorativos" },
          { name: "Alfombras", slug: "alfombras", description: "Alfombras y tapetes" },
          { name: "Floreros", slug: "floreros", description: "Floreros y vasijas" },
        ],
      },
    },
  });

  const exterior = await prisma.category.create({
    data: {
      name: "Exterior",
      slug: "exterior",
      description: "Muebles y decoración para exteriores",
    },
  });

  const sofas = await prisma.category.findUniqueOrThrow({ where: { slug: "sofas" } });
  const mesas = await prisma.category.findUniqueOrThrow({ where: { slug: "mesas" } });
  const sillas = await prisma.category.findUniqueOrThrow({ where: { slug: "sillas" } });
  const camas = await prisma.category.findUniqueOrThrow({ where: { slug: "camas" } });
  const lamparasPie = await prisma.category.findUniqueOrThrow({ where: { slug: "lamparas-pie" } });
  const lamparasTecho = await prisma.category.findUniqueOrThrow({ where: { slug: "lamparas-techo" } });
  const espejos = await prisma.category.findUniqueOrThrow({ where: { slug: "espejos" } });
  const alfombras = await prisma.category.findUniqueOrThrow({ where: { slug: "alfombras" } });
  const cuadros = await prisma.category.findUniqueOrThrow({ where: { slug: "cuadros" } });
  const floreros = await prisma.category.findUniqueOrThrow({ where: { slug: "floreros" } });
  const lamparasMesa = await prisma.category.findUniqueOrThrow({ where: { slug: "lamparas-mesa" } });

  const productData = [
    {
      name: "Sofá Milano",
      slug: "sofa-milano",
      description: "Sofá de tres puestos en terciopelo verde botella con patas de metal dorado. Un diseño que combina confort y sofisticación para tu sala de estar.",
      price: 2890000,
      compareAt: 3500000,
      stock: 12,
      isFeatured: true,
      isNew: true,
      color: "Verde botella",
      material: "Terciopelo / Metal",
      dimensions: "220×90×85 cm",
      categoryId: sofas.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", alt: "Sofá Milano", isPrimary: true, order: 0 }] },
    },
    {
      name: "Mesa de centro Koi",
      slug: "mesa-centro-koi",
      description: "Mesa de centro redonda en mármol travertino con base de acero inoxidable cepillado. Una pieza escultórica para el centro de tu sala.",
      price: 1850000,
      compareAt: null,
      stock: 6,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      color: "Beige / Plata",
      material: "Mármol / Acero",
      dimensions: "Ø100×40 cm",
      categoryId: mesas.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800", alt: "Mesa de centro Koi", isPrimary: true, order: 0 }] },
    },
    {
      name: "Silla Eclipse",
      slug: "silla-eclipse",
      description: "Silla de comedor tapizada en lino negro con estructura de madera de fresno. Minimalista y atemporal.",
      price: 450000,
      compareAt: 550000,
      stock: 25,
      isFeatured: false,
      isNew: true,
      color: "Negro / Madera",
      material: "Lino / Fresno",
      dimensions: "48×52×82 cm",
      categoryId: sillas.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800", alt: "Silla Eclipse", isPrimary: true, order: 0 }] },
    },
    {
      name: "Cama Serenity",
      slug: "cama-serenity",
      description: "Cama queen size con cabecero tapizado en lino arena y estructura de roble macizo. Diseño japonés contemporáneo.",
      price: 3200000,
      compareAt: 4100000,
      stock: 4,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      color: "Arena / Roble",
      material: "Lino / Roble macizo",
      dimensions: "170×210×110 cm",
      categoryId: camas.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800", alt: "Cama Serenity", isPrimary: true, order: 0 }] },
    },
    {
      name: "Lámpara de pie Atlas",
      slug: "lampara-pie-atlas",
      description: "Lámpara de pie de 180cm con pantalla de lino y estructura de latón envejecido. Tres puntos de luz regulables.",
      price: 980000,
      compareAt: null,
      stock: 8,
      isFeatured: true,
      isNew: true,
      color: "Latón / Crudo",
      material: "Latón / Lino",
      dimensions: "Ø45×180 cm",
      categoryId: lamparasPie.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800", alt: "Lámpara de pie Atlas", isPrimary: true, order: 0 }] },
    },
    {
      name: "Lámpara colgante Nova",
      slug: "lampara-colgante-nova",
      description: "Lámpara de techo con 5 globos de vidrio soplado ahumado y estructura de bronce. Ideal sobre mesas de comedor.",
      price: 1250000,
      compareAt: 1500000,
      stock: 3,
      isFeatured: false,
      isNew: false,
      isBestSeller: true,
      color: "Bronce / Ahumado",
      material: "Vidrio / Bronce",
      dimensions: "Ø80×150 cm",
      categoryId: lamparasTecho.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800", alt: "Lámpara colgante Nova", isPrimary: true, order: 0 }] },
    },
    {
      name: "Espejo Arco",
      slug: "espejo-arco",
      description: "Espejo de pared con forma de arco y marco de metal negro mate. 180cm de alto, perfecto para entradas y vestidores.",
      price: 780000,
      compareAt: 950000,
      stock: 15,
      isFeatured: false,
      isNew: true,
      color: "Negro mate",
      material: "Vidrio / Metal",
      dimensions: "80×180×4 cm",
      categoryId: espejos.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800", alt: "Espejo Arco", isPrimary: true, order: 0 }] },
    },
    {
      name: "Alfombra Berbería",
      slug: "alfombra-berberia",
      description: "Alfombra tejida a mano en lana virgen con patrón geométrico bereber. Tonos crudos y negros.",
      price: 650000,
      compareAt: null,
      stock: 10,
      isFeatured: false,
      isNew: false,
      isBestSeller: true,
      color: "Crudo / Negro",
      material: "Lana virgen",
      dimensions: "200×300 cm",
      categoryId: alfombras.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800", alt: "Alfombra Berbería", isPrimary: true, order: 0 }] },
    },
    {
      name: "Mesa de comedor Oslo",
      slug: "mesa-comedor-oslo",
      description: "Mesa de comedor para 6 personas en roble macizo con acabado natural. Patas en forma de V. Diseño escandinavo contemporáneo.",
      price: 2450000,
      compareAt: 2900000,
      stock: 3,
      isFeatured: true,
      isNew: false,
      color: "Roble natural",
      material: "Roble macizo",
      dimensions: "200×100×76 cm",
      categoryId: mesas.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800", alt: "Mesa de comedor Oslo", isPrimary: true, order: 0 }] },
    },
    {
      name: "Sofá Terrace",
      slug: "sofa-terrace",
      description: "Sofá modular de exterior en ratán sintético color arena con cojines impermeables. Configurable en L o lineal.",
      price: 3800000,
      compareAt: null,
      stock: 2,
      isFeatured: true,
      isNew: true,
      color: "Arena",
      material: "Ratán sintético / Textil impermeable",
      dimensions: "280×180×75 cm",
      categoryId: exterior.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800", alt: "Sofá Terrace", isPrimary: true, order: 0 }] },
    },
    {
      name: "Cuadro Abstracto Horizonte",
      slug: "cuadro-abstracto-horizonte",
      description: "Lienzo abstracto de gran formato con técnica mixta en tonos tierra, azul profundo y dorado.",
      price: 480000,
      compareAt: 600000,
      stock: 7,
      isFeatured: false,
      isNew: true,
      color: "Multicolor",
      material: "Lienzo / Técnica mixta",
      dimensions: "120×80 cm",
      categoryId: cuadros.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800", alt: "Cuadro Abstracto Horizonte", isPrimary: true, order: 0 }] },
    },
    {
      name: "Florero Terra",
      slug: "florero-terra",
      description: "Florero artesanal en cerámica esmaltada color terracota. 45cm de alto. Pieza única hecha a mano.",
      price: 180000,
      compareAt: null,
      stock: 20,
      isFeatured: false,
      isNew: false,
      isBestSeller: true,
      color: "Terracota",
      material: "Cerámica esmaltada",
      dimensions: "Ø25×45 cm",
      categoryId: floreros.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1612198188851-a0edf15c9b28?w=800", alt: "Florero Terra", isPrimary: true, order: 0 }] },
    },
    {
      name: "Lámpara de mesa Moon",
      slug: "lampara-mesa-moon",
      description: "Velador con base de mármol blanco y pantalla globo de vidrio opalino. Luz cálida regulable con dimmer táctil.",
      price: 380000,
      compareAt: 450000,
      stock: 18,
      isFeatured: true,
      isNew: false,
      color: "Blanco / Dorado",
      material: "Mármol / Vidrio opalino",
      dimensions: "Ø20×35 cm",
      categoryId: lamparasMesa.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", alt: "Lámpara de mesa Moon", isPrimary: true, order: 0 }] },
    },
    {
      name: "Escritorio Minimal",
      slug: "escritorio-minimal",
      description: "Escritorio flotante en nogal con cajón oculto. 140cm de ancho. Instalación con soportes ocultos incluidos.",
      price: 1200000,
      compareAt: null,
      stock: 5,
      isFeatured: false,
      isNew: true,
      color: "Nogal",
      material: "Nogal macizo",
      dimensions: "140×55×12 cm",
      categoryId: muebles.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800", alt: "Escritorio Minimal", isPrimary: true, order: 0 }] },
    },
    {
      name: "Silla Lounge Palermo",
      slug: "silla-lounge-palermo",
      description: "Sillón lounge giratorio tapizado en bouclé crema con base de metal negro. El rincón de lectura perfecto.",
      price: 1680000,
      compareAt: 2100000,
      stock: 4,
      isFeatured: true,
      isNew: false,
      isBestSeller: true,
      color: "Crema / Negro",
      material: "Bouclé / Metal",
      dimensions: "85×80×95 cm",
      categoryId: muebles.id,
      images: { create: [{ url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", alt: "Silla Lounge Palermo", isPrimary: true, order: 0 }] },
    },
  ];

  for (const product of productData) {
    await prisma.product.create({ data: product });
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@deateka.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "cambiame123";

  await prisma.user.create({
    data: {
      name: "Admin DEATEKA",
      email: adminEmail,
      password: bcrypt.hashSync(adminPassword, 10),
      role: "admin",
    },
  });

  console.log("Seed completado:");
  console.log(`  - ${productData.length} productos con imágenes de Unsplash`);
  console.log("  - Categorías: Muebles, Iluminación, Decoración, Exterior");
  console.log(`  - Admin: ${adminEmail} (contraseña configurable vía ADMIN_PASSWORD)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
