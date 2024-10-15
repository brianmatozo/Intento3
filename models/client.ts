// models/clientModel.ts
import { Document, model, models, Schema } from "mongoose";
import { onlineCourse, OnlineCourseSchema } from "./online";

export interface Client extends Document {
  _id: string;
  fullname: string;
  phonenumber: string;
  email: string;
  amount: number;
  date: Date;
  mode: boolean;
  onlineCourses?: onlineCourse[];
  paymentOptions: string;
  paymentNumber: string;
}

// Create the Client Schema
const ClientSchema = new Schema<Client>({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  mode: { type: Boolean, required: true },
  onlineCourses: [OnlineCourseSchema],
  paymentOptions: {
    type: String,
    enum: [
      "Efectivo",
      "COAPSA",
      "PABLO.BIANCHI",
      "Carlos1971Marquez",
    ],
    required: true,
  },
  paymentNumber: { type: String, required: true },
});

// Check for existing model or create a new one
const ClientModel =
  models.Client || model<Client>("Client", ClientSchema, "clients");

export default ClientModel;
