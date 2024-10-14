import { create } from "controllers/course";
import connectDB from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        await connectDB();
        if (req.method === "POST") {
            return create(req, res);
        } else {
            res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.error("Error in API handler:", error);
        res.status(500).json({ error: "Failed to fetch courses" });
    }
}

export default handler