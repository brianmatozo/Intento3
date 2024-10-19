// schemas/paymentSchema.ts
import { z } from 'zod';

export const miscellaneousPaymentSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  paymentType: z.enum(['certification', 'matricula']),
  courseId: z.string().nonempty("Course ID is required"),
  clientId: z.string().nonempty("Client ID is required"),
  paymentDate: z.date().default(() => new Date()),
  miscPaymentOptions: z.enum([
    "Efectivo",
    "COAPSA",
    "PABLO.BIANCHI",
    "Carlos1971Marquez"
  ]),
  miscPaymentNumber: z.string().nonempty({ message: "Obligatorio" }),
});

export type MiscellaneousPayment = z.infer<typeof miscellaneousPaymentSchema>;