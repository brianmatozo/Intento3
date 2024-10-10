import { Document, model, models, Schema } from 'mongoose';

export interface Client extends Document {
  _id: string;
  fullname: string;
  phonenumber: string;
  email: string;
  amount: number;
  date: Date;
}

// Create the Client schema
const ClientSchema = new Schema<Client>({
  fullname: { type: String, required: true },
  phonenumber: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const ClientModel = models.Client || model<Client>("Client", ClientSchema, "clients");

export default ClientModel;
