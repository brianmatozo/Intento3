// schemas/clientSchema.ts
import { z } from "zod";
import { onlineCourseSchema } from "./onlineCourseSchema";

export const clientSchema = z.object({
  fullname: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  phonenumber: z
    .string()
    .min(10, { message: "Numero de telefono debe tener al menos 10 caracteres" }),
  email: z.string().email({ message: "Email no es valido" }),
  amount: z.coerce.number().min(1, { message: "El monto debe ser mayor a 0" }),
  date: z.coerce.date().default(() => new Date()),
  mode: z.boolean().default(false), // false = presencial, true = online
  onlineCourses: z.array(onlineCourseSchema).optional(), // Embed online courses
  paymentOptions: z.enum([
    "Efectivo",
    "COAPSA",
    "PABLO.BIANCHI",
    "Carlos1971Marquez"
  ]),
});