import type mongoose from "mongoose";
import { model, models, Schema, type Model } from "mongoose";

export interface User {
  name: string;
  email: string;
  password: string; // Make sure to hash passwords before saving
}

export interface AuthUser {
  id: string; // or ObjectId, depending on usage
  name: string;
  email: string;
}

const UserSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export type UserDocument = mongoose.HydratedDocument<User>;


const UserModel: Model<UserDocument> = models.User ?? model<UserDocument>("User", UserSchema);

export default UserModel;
