// pages/api/clients.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAll } from "controllers/client";
import { clientSchema } from "schema/clientSchema";
import ClientModel, { type Client } from "models/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const result = clientSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({ error: result.error });
      }

      const newClient: Client = new ClientModel(result.data) as Client;
      await newClient.save();
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

