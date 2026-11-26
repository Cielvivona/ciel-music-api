
import { z } from "zod";

export const artistaSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  pais: z.string().optional(),
  genero: z.string().optional()
});
