import { z } from "zod";

export const clientSchema = z.object({
  fullname: z.string().min(2, { message: "Full name must be at least 2 characters long" }),
  phonenumber: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Invalid email address" }),
  amount: z.coerce.number().min(1, { message: "Amount must be at least 1" }),
  date: z.string().nonempty({ message: "Date is required" }),
  mode: z.boolean().default(false), // false = presencial, true = online
  courses: z.array(z.string().uuid()),
  certificationCard: z.boolean().default(false), // Default to false
  matriculaCard: z.boolean().default(false), // Default to false
});

