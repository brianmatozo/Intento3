// import { Document, Schema, model, models } from "mongoose";

// export interface Course extends Document {
//   name: string;
//   startDate: Date;
//   expirationDate?: Date; // Only for online courses
//   certification: boolean; // Indicates if the course offers a certification card
//   matricula: boolean; // Indicates if the course offers a matricula card
//   classCount?: number; // Optional for presencial courses
//   mode: boolean; // false = presencial, true = online
//   clients: Schema.Types.ObjectId[];
//   classSchedule: Schema.Types.ObjectId[]; // To store class dates
// }

// const CourseSchema = new Schema<Course>({
//   name: { type: String, required: true },
//   startDate: { type: Date, required: true },
//   expirationDate: { type: Date }, // Optional for online courses
//   certification: { type: Boolean, default: false }, // Indicates if certification is available
//   matricula: { type: Boolean, default: false }, // Indicates if matricula is available
//   classCount: { type: Number }, // Optional for presencial courses
//   mode: { type: Boolean, required: true },
//   clients: [{ type: Schema.Types.ObjectId, ref: "Client" }],
//   classSchedule: [
//     {
//       type: Date,
//       required: function (this: Course) {
//         return !this.mode;
//       },
//     },
//   ], // Only for presencial courses
// });

// const CourseModel = models.Course || model<Course>("Course", CourseSchema);

// export default CourseModel;
