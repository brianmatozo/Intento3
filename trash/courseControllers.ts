import CourseModel from "trash/course";
import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";

export const create = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { name, startDate, expirationDate, certification, matricula, classCount, mode, classSchedule } = req.body;
        const newCourse = new CourseModel({
            name,
            startDate,
            expirationDate,
            certification,
            matricula,
            classCount,
            mode,
            classSchedule
        });
        await newCourse.save();
        res.status(201).json({ ok: true, data: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Failed to create course" });
    }
}