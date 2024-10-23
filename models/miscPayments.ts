// models/payments.ts
import mongoose, { model, models, Schema, type Model } from "mongoose";


export interface miscPayment {
  _id: mongoose.Types.ObjectId;
  amount: number;
  paymentType: "certification" | "matricula";
  clientId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  paymentDate: Date;
  miscPaymentOptions: "Efectivo" | "COAPSA" | "PABLO.BIANCHI" | "Carlos1971Marquez";
  miscPaymentNumber: string;
}

// Define the schema
export const miscellaneousPaymentSchema = new Schema<miscPayment>({
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be positive"],
  },
  paymentType: {
    type: String,
    enum: ["certification", "matricula"],
    required: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OnlineCourse",
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  miscPaymentOptions: {
    type: String,
    enum: ["Efectivo", "COAPSA", "PABLO.BIANCHI", "Carlos1971Marquez"],
    required: true,
  },
  miscPaymentNumber: {
    type: String,
    required: true,
  },
});

// Create the model
export const MiscellaneousPaymentModel: Model<miscPayment> =
  models.MiscellaneousPayment ??
  model<miscPayment>(
    "MiscellaneousPayment",
    miscellaneousPaymentSchema,
    "miscPayment"
  );
