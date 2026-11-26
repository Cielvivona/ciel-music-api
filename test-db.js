
import prisma from "./lib/prisma.js";

try {
  const artistas = await prisma.artista.findMany();

  console.log("Conexión con Supabase exitosa");
  console.log("Artistas encontrados:", artistas);
} catch (error) {
  console.error("Error:", error.message);
} finally {
  await prisma.$disconnect();
}
