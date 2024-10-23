// /pages/api/clients/[id]/add-course.ts

import type { NextApiRequest, NextApiResponse } from "next";
import type mongoose from "mongoose";
import { onlineCourseSchema } from "schema/onlineCourseSchema";
import ClientModel, { type Client } from "models/client";
import type { onlineCourse } from "models/online";

const addCourseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; 
  const newCourse: onlineCourse = req.body;

  try {
    const validationResult = onlineCourseSchema.safeParse(newCourse);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const client: Client | null = await (ClientModel as mongoose.Model<Client>).findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }
    client.onlineCourses?.push(validationResult.data as onlineCourse);
    await client.save();

    res.status(200).json(validationResult.data);
  } catch (error) {
    console.error("Failed to add course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

export default addCourseHandler; 
