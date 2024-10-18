// controllers/client.ts
import { NextApiRequest, NextApiResponse } from "next";
import ClientModel, { Client } from "../models/client";
import mongoose, { FilterQuery } from "mongoose";

export const getAll = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { searchText, searchPhone } = req.query;
    const searchString = Array.isArray(searchText) ? searchText[0] : searchText;
    const searchPhoneString = Array.isArray(searchPhone) ? searchPhone[0] : searchPhone;
    const filter: FilterQuery<Client>  = {};

    if(searchString){
       filter.fullname = { $regex: new RegExp(searchString, "i") } }
  
    if(searchPhoneString){
      filter.phonenumber = { $regex: new RegExp(searchPhoneString, "i") } }

    let clients: Client[];

    if (searchString || searchPhoneString) {
      clients = await (ClientModel as mongoose.Model<Client>)
        .find(filter)
        .populate("miscellaneousPayments")
        .exec();
    } else {
      clients = await (ClientModel as mongoose.Model<Client>)
        .find(filter)
        .limit(10)
        .populate("miscellaneousPayments")
        .exec();
    }
    // const clients: Client[] = await (ClientModel as mongoose.Model<Client>).find(filter).exec();
    res.status(200).json({ ok: true, data: clients });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
};
