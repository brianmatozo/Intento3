// /pages/api/clients/[id]/add-course.ts

import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { onlineCourseSchema } from "schema/onlineCourseSchema";
import ClientModel, { Client } from "models/client";

const addCourseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;  // Note: `req.query` is used for URL parameters in Next.js
  const newCourse = req.body;

  try {
    // Validate the course data using Zod/Yup schema
    const validationResult = onlineCourseSchema.safeParse(newCourse);
    if (!validationResult.success) {
      return res.status(400).json({ error: validationResult.error });
    }

    const client: Client | null = await (ClientModel as mongoose.Model<Client>).findById(id);
    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    // Add the validated course to the client's `onlineCourses` array
    client.onlineCourses?.push(newCourse);
    await client.save();

    // Respond with the updated client or new course
    res.status(200).json(newCourse);  // Optionally return the updated client
  } catch (error) {
    console.error("Failed to add course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

export default addCourseHandler;
