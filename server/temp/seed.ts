/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Listing } from "../src/lib/types";

const seed = async () => {
  try {
    console.log(`[seed] : running...`);

    const db = await connectDatabase();
    const listings: Listing[] = [
      {
        _id: new ObjectId(),
        productName: "gongbaojiding",
        image: "image001",
        price: 10,
        rating: 1,
      },
    ];

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log(`[seed] : success`);
  } catch (error) {
    throw new Error("failed to seed database");
  }
};

seed();
