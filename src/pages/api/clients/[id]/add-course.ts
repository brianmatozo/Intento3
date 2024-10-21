// /pages/api/clients/[id]/add-course.ts

import type { NextApiRequest, NextApiResponse } from "next";
import type mongoose from "mongoose";
import { onlineCourseSchema } from "schema/onlineCourseSchema";
import ClientModel, { type Client } from "models/client";

const addCourseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; 
  const newCourse = req.body;

  try {
    const validationResult = onlineCourseSchema.safeParse(newCourse);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const client: Client | null = await (ClientModel as mongoose.Model<Client>).findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    client.onlineCourses?.push(newCourse);
    await client.save();

    res.status(200).json(newCourse);
  } catch (error) {
    console.error("Failed to add course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

export default addCourseHandler;
