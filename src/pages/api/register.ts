import connectDB from "lib/mongodb";
import UserModel, { type UserDocument } from "models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import type mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();

    const { name, email, password }: UserDocument = req.body as UserDocument;

    try {
      const existingUser: UserDocument | null = await UserModel.findOne({ email }).exec();
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword: string = bcrypt.hashSync(password, 10);
      const user: mongoose.HydratedDocument<UserDocument> = new UserModel({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "User registration failed" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};  

export default handler;

