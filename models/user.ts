import { Document, model, models, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  email: string;
  password: string; // Make sure to hash passwords before saving
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserModel = models.User || model<User>("User", UserSchema);

export default UserModel;
