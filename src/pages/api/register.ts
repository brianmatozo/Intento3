import connectDB from "lib/mongodb";
import UserModel, { type User } from "models/user";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import type mongoose from "mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();

    const { name, email, password }: User = req.body;

    try {
      const existingUser: User | null = await (UserModel as mongoose.Model<User>).findOne({ email }).exec();
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
      const hashedPassword: string = bcrypt.hashSync(password, 10);
      const user: mongoose.Document<User> = new UserModel({ name, email, password: hashedPassword });
      await (user.save as () => Promise<mongoose.Document>)();
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

