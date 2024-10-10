import connectDB from "lib/mongodb";
import UserModel from "models/user";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }

      // Hash password before saving
      const hashedPassword = bcrypt.hashSync(password, 10);

      const user = new UserModel({ name, email, password: hashedPassword });
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
