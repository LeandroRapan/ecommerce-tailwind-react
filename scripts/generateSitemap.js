import fs from "fs";
import path, { join, dirname } from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ================================
// 🔐 Configurar Firebase Admin
// ================================
console.log("🚀 Iniciando script de sitemap...");

const serviceAccountPath = join(__dirname, "serviceAccountKey.json");

console.log("📌 Buscando credenciales en:", serviceAccountPath);

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ No se encontró serviceAccountKey.json");
  process.exit(1);
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

// Evitar inicializar más de una vez
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

// ================================
// 🌍 Config
// ================================
const DOMAIN = process.env.DOMAIN || "https://touch-argentina.com"; 
const PUBLIC_DIR = join(__dirname, "..", "public");
const SITEMAP_PATH = join(PUBLIC_DIR, "sitemap.xml");

// ================================
// 📌 Rutas estáticas
// ================================
const staticUrls = [
  { url: "/", priority: 1.0 },
  { url: "/Ofertas", priority: 0.8 },
  { url: "/SobreNosotros", priority: 0.5 },
];

// ================================
// 🔍 Obtener productos
// ================================
let products = [];

try {
  console.log("📄 Consultando productos desde Firestore...");

  const productsSnapshot = await db.collection("products").get();

  products = productsSnapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(prod => prod.stock && prod.stock > 0);

  console.log(`✔ Productos con stock: ${products.length}`);
} catch (err) {
  console.error("❌ Error al consultar Firestore:", err);
}

// ================================
// 🧩 Construcción del sitemap
// ================================
const urls = [
  ...staticUrls,
  ...products.map(p => ({
    url: `/Producto/${p.id}`,
    priority: 0.7
  }))
];

console.log("📌 URLs totales a incluir:", urls.length);

try {
  const stream = new SitemapStream({ hostname: DOMAIN });

  console.log("🔄 Generando XML...");
  const xml = await streamToPromise(Readable.from(urls).pipe(stream));

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log("📁 Creando carpeta public...");
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  console.log("📝 Guardando archivo sitemap:", SITEMAP_PATH);
  fs.writeFileSync(SITEMAP_PATH, xml.toString());

  console.log("🎉 ¡Sitemap generado exitosamente!");
  console.log(`📌 Total URLs: ${urls.length}`);
  console.log("🏁 Script finalizado con éxito");

} catch (err) {
  console.error("❌ Error generando sitemap:", err);
}
