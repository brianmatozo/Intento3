// // models/studentModel.ts
// import { Document, model, models, Schema } from "mongoose";

// // Define the OnlineCourse interface
// interface OnlineCourse {
//   name:
//     | "Refrigeracion"
//     | "Lavarropas"
//     | "Electronica"
//     | "Esp. Refrigeracion"
//     | "Esp. Lavarropas"
//     | "Rep. Plaquetas";
//   startDate: Date;
//   expirationDate?: Date; // Optional
//   certification: boolean;
//   matricula: boolean;
// }

// // Define the Student interface
// export interface Student extends Document {
//   fullname: string;
//   phonenumber: string;
//   email: string;
//   amount: number;
//   inscriptionDate: Date;
//   mode: boolean;
//   onlineCourses?: OnlineCourse[]; // Embed online courses
// }

// // Create the Student Schema
// const OnlineCourseSchema = new Schema<OnlineCourse>({
//   name: {
//     type: String,
//     enum: [
//       "Refrigeracion",
//       "Lavarropas",
//       "Electronica",
//       "Esp. Refrigeracion",
//       "Esp. Lavarropas",
//       "Rep. Plaquetas",
//     ],
//     required: true,
//   },
//   startDate: { type: Date, required: true },
//   expirationDate: { type: Date, optional: true },
//   certification: { type: Boolean, default: false },
//   matricula: { type: Boolean, default: false },
// });

// const StudentSchema = new Schema<Student>({
//   fullname: { type: String, required: true },
//   phonenumber: { type: String, required: true },
//   email: { type: String, required: true },
//   amount: { type: Number, required: true },
//   inscriptionDate: { type: Date, required: true },
//   mode: { type: Boolean, required: true },
//   onlineCourses: [OnlineCourseSchema], // Embed online courses
// });

// // Check for existing model or create a new one
// const StudentModel =
//   models.Student || model<Student>("Student", StudentSchema, "students");

// export default StudentModel;
