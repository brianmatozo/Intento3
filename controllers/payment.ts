import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { MiscellaneousPaymentModel, miscPayment } from "models/miscPayments";

export const getById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const payment = await (MiscellaneousPaymentModel as mongoose.Model<miscPayment>).findById(id).exec();
    res.status(200).json({ ok: true, data: payment });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};

export const getByClientId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { clientId } = req.query;
    const payments = await (MiscellaneousPaymentModel as mongoose.Model<miscPayment>).find({ clientId }).exec();
    res.status(200).json({ ok: true, data: payments });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};