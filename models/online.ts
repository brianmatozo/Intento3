import { model, models, Schema } from "mongoose";

interface OnlineCourse {
  name:
    | "Refrigeracion"
    | "Lavarropas"
    | "Electronica"
    | "Esp. Refrigeracion"
    | "Esp. Lavarropas"
    | "Rep. Plaquetas";
  startDate: Date;
  expirationDate?: Date; // Optional
  certification: boolean;
  matricula: boolean;
}

export const OnlineCourseSchema = new Schema<OnlineCourse>({
  name: {
    type: String,
    enum: [
      "Refrigeracion",
      "Lavarropas",
      "Electronica",
      "Esp. Refrigeracion",
      "Esp. Lavarropas",
      "Rep. Plaquetas",
    ],
    required: true,
  },
  startDate: { type: Date, required: true },
  expirationDate: { type: Date, optional: true },
  certification: { type: Boolean, default: false },
  matricula: { type: Boolean, default: false },
});

const OnlineCourseModel =
  models.OnlineCourse ||
  model<OnlineCourse>("OnlineCourse", OnlineCourseSchema, "onlineCourses");

export default OnlineCourseModel;
