require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Listing } from "../src/lib/types";

const seed = async () => {
  try {
    console.log(`[seed] : running...`);

    const db = await connectDatabase();
    export const listings: Listing[] = [
      {
        _id: new ObjectId(),
        image: "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        price: 10000,
        rating: 5,
      },
      // ...
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
