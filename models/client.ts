import { Document, model, models, Schema } from 'mongoose';

export interface Client extends Document {
  fullname: string;
  phonenumber: string;
  email: string;
  amount: number;
  date: Date;
  mode: boolean;
  courses: Schema.Types.ObjectId[];
  certificationCard: boolean; // Represents if the student purchased the certification card
  matriculaCard: boolean; // Represents if the student purchased the matricula card
}

// Create the Client schema
const ClientSchema = new Schema<Client>({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  mode: { type: Boolean, required: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  certificationCard: { type: Boolean, default: false }, // Default to false
  matriculaCard: { type: Boolean, default: false }, // Default to false
});

const ClientModel = models.Client || model<Client>("Client", ClientSchema, "clients");

export default ClientModel;