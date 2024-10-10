import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongodb";
import ClientModel from "../../../models/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await connectDB();

      const { fullname, phonenumber, email, amount, date } = req.body;

      const newClient = new ClientModel({
        fullname,
        phonenumber,
        email,
        amount,
        date,
      });

      const savedClient = await newClient.save();
      
      res.status(201).json(savedClient);
    } catch (error) {
      console.error("Error creating new client:", error);
      res.status(500).json({ error: "Failed to create new client" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
