// estoy hardcodeando para que zod rechace valores incorrectos
import { z } from "zod";

export const albumSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  anio: z.number().int().min(1900).max(2100),
  descripcion: z.string().optional(),
  artistaId: z.number().int().positive()
});
