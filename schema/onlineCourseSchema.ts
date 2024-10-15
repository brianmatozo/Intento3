// schemas/onlineCourseSchema.ts
import { z } from "zod";

export const onlineCourseSchema = z.object({
  name: z.enum([
    "Refrigeracion",
    "Lavarropas",
    "Electronica",
    "Esp. Refrigeracion",
    "Esp. Lavarropas",
    "Rep. Plaquetas",
  ]),
  startDate: z.coerce.date({ message: "Fecha de inicio es inválida" }),
  expirationDate: z.coerce.date().optional(), // Optional for online courses
  certification: z.boolean().default(false), // Indicates if certification card can be purchased
  matricula: z.boolean().default(false), // Indicates if matricula card can be purchased
});