import { z } from "zod";

export const courseSchema = z.object({
  name: z.enum([
    "Refrigeracion",
    "Lavarropas",
    "Electronica",
    "Esp. Refrigeracion",
    "Esp. Lavarropas",
    "Rep. Plaquetas",
  ]),
  startDate: z.string().nonempty({ message: "Start date is required" }),
  expirationDate: z.string().optional(), // Optional for online courses
  certification: z.boolean().default(false), // Indicates if certification card can be purchased
  matricula: z.boolean().default(false), // Indicates if matricula card can be purchased
  classCount: z.number().optional(), // Optional for presencial courses
  mode: z.boolean().default(false), // false = presencial, true = online
  classSchedule: z.array(z.string()).optional(), // Only for presencial courses
}).refine((data) => {
  // Ensure that classCount and classSchedule are present only if the course is presencial
  if (!data.mode) {
    if (!data.classCount || !data.classSchedule) {
      return false;
    }
  }

  // Validate expiration date if provided
  if (data.expirationDate) {
    const expirationDate = new Date(data.expirationDate);
    const startDate = new Date(data.startDate);
    if (expirationDate <= startDate) {
      return false;
    }
  }

  return true;
}, {
  message: "Class count and schedule are required for presencial courses, and expiration date must be after the start date.",
  path: ["classCount", "classSchedule", "expirationDate"],
});
