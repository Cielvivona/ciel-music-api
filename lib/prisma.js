
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Adaptador para conectar Prisma con PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DIRECT_URL
});

// Cliente Prisma que utilizará nuestra API
const prisma = new PrismaClient({
  adapter
});

export default prisma;
