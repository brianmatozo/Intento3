import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongodb";
import { getAll } from "controllers/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectDB();

    if (req.method === "GET") {
      return getAll(req, res);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

export default handler;
