import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongodb";
import ClientModel from "../../../models/client";
import { getAll } from "controllers/client";
import { clientSchema } from "schema/clientSchema";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    if (req.method === "POST") {
      const result = await clientSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      const newClient = new ClientModel(result.data);

      await newClient.save()

      res.status(201).json(newClient);
    } else if (req.method === "GET") {
      return getAll(req, res);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to create new client" });
  }
};

export default handler;

