// models/clientModel.ts
import { type Document, model, models, Schema } from "mongoose";
import { type onlineCourse, OnlineCourseSchema } from "./online";
import { miscellaneousPaymentSchema, type miscPayment } from "./miscPayments";

export interface Client extends Document {
  _id: string;
  fullname: string;
  phonenumber: string;
  email: string;
  amount: number;
  date: Date;
  mode: boolean;
  paymentOptions: string;
  paymentNumber: string;
  onlineCourses?: onlineCourse[];
  miscellaneousPayments?: miscPayment[];
}

// Create the Client Schema
const ClientSchema = new Schema<Client>({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  mode: { type: Boolean, required: true },
  paymentOptions: { type: String, required: true },
  paymentNumber: { type: String, required: true },
  onlineCourses: [OnlineCourseSchema],
  miscellaneousPayments: [miscellaneousPaymentSchema],
});

// Check for existing model or create a new one
const ClientModel =
  models.Client ?? model<Client>("Client", ClientSchema, "clients");

export default ClientModel;
