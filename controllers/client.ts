import { NextApiRequest, NextApiResponse } from "next";
import ClientModel, { Client } from "../models/client";
import mongoose from "mongoose";

export const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { searchText } = req.query;
    const searchString = Array.isArray(searchText) ? searchText[0] : searchText;

    const filter = searchString
      ? { fullname: { $regex: new RegExp(searchString, 'i') } }
      : {};

    const clients: Client[] = await (ClientModel as mongoose.Model<Client>).find(filter).exec();
    res.status(200).json({ ok: true, data: clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};
