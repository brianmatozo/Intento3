// models/payments.ts
import mongoose, { model, models, Schema } from "mongoose";

export interface miscPayment extends Document {
  amount: number;
  paymentType: string;
  clientId: mongoose.Schema.Types.ObjectId;
  paymentDate: Date;
}

const miscellaneousPaymentSchema = new Schema<miscPayment>({
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
    type: Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

export const MiscellaneousPaymentModel =
  models.miscPayment ||
  model<miscPayment>(
    "MiscellaneousPayment",
    miscellaneousPaymentSchema,
    "miscPayment"
  );
