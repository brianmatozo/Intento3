// pages/api/payments.ts
import { getByClientId } from "controllers/payment";
import { CERTIFICATION_PRICE, MATRICULA_PRICE } from "lib/prices";
import ClientModel, { type Client } from "models/client";
import { MiscellaneousPaymentModel } from "models/miscPayments";
import type mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import { miscellaneousPaymentSchema } from "schema/miscPaymentSchemas";

// POST route to create a new miscPayment
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { paymentDate, ...rest } = req.body;
      const parsedPaymentDate = paymentDate ? new Date(paymentDate) : new Date();
      const result = miscellaneousPaymentSchema.safeParse({
        ...rest,
        paymentDate: parsedPaymentDate,
      });
      if (!result.success) {
        console.error("Backend Validation Error:", result.error);
        return res.status(400).json({ error: "Invalid payment data", issues: result.error.issues });
      }
      const newPayment = new MiscellaneousPaymentModel(result.data);
      const savedPayment = await newPayment.save();
      const client = await (ClientModel as mongoose.Model<Client>).findById(result.data.clientId);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }      
      if (!client.miscellaneousPayments) {
        client.miscellaneousPayments = [];
      }
      client.miscellaneousPayments?.push(savedPayment);

      // Calculate total payments for this course for certification and matricula
      const certificationTotal = client.miscellaneousPayments
        .filter(p => p.paymentType === "certification" && p.courseId?.toString() === result.data.courseId)
        .reduce((sum, p) => sum + p.amount, 0);

      const matriculaTotal = client.miscellaneousPayments
        .filter(p => p.paymentType === "matricula" && p.courseId?.toString() === result.data.courseId)
        .reduce((sum, p) => sum + p.amount, 0);

      // Find the specific course in the client's onlineCourses array
      const courseIndex = client.onlineCourses?.findIndex(course => course._id?.toString() === result.data.courseId);

      if (Array.isArray(client?.onlineCourses) && courseIndex !== undefined && courseIndex >= 0) {
          if (client.onlineCourses[courseIndex] !== undefined) {
              // Check if the certification or matricula goal is reached
              if (certificationTotal >= CERTIFICATION_PRICE) {
                  client.onlineCourses[courseIndex].certification = true;
              }

              if (matriculaTotal >= MATRICULA_PRICE) {
                  client.onlineCourses[courseIndex].matricula = true;
              }
              await client.save();
              // console.log("Updated client:", client);
          }
      }
      
      return res.status(201).json(savedPayment);
    } else if (req.method === "GET") {
      return getByClientId(req, res);
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in API handler:", error);
    res.status(500).json({ error: "Failed to create new payment" });
  }
};


export default handler;