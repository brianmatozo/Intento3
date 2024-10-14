// models/clientModel.ts
import { Document, model, models, Schema } from "mongoose";
import { OnlineCourseSchema } from "./online";

interface onlineCourse {
  name:
    | "Refrigeracion"
    | "Lavarropas"
    | "Electronica"
    | "Esp. Refrigeracion"
    | "Esp. Lavarropas"
    | "Rep. Plaquetas";
  startDate: Date;
  expirationDate?: Date; // Optional
  certification: boolean;
  matricula: boolean;
}

// Define the Client interface
export interface Client extends Document {
  fullname: string;
  phonenumber: string;
  email: string;
  amount: number;
  date: Date;
  mode: boolean;
  onlineCourses?: onlineCourse[];
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
});

// Check for existing model or create a new one
const ClientModel =
  models.Client || model<Client>("Client", ClientSchema, "clients");

export default ClientModel;
