// models/payments.ts
import mongoose, { model, models, Schema } from "mongoose";
import { Document } from "mongoose";

export interface miscPayment extends Document {
  amount: number;
  paymentType: "certification" | "matricula";
  clientId: mongoose.Schema.Types.ObjectId;
  courseId: mongoose.Schema.Types.ObjectId;
  paymentDate: Date;
}

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
});

export const MiscellaneousPaymentModel =
  models.MiscellaneousPayment ||
  model<miscPayment>(
    "MiscellaneousPayment",
    miscellaneousPaymentSchema,
    "miscPayment"
  );
