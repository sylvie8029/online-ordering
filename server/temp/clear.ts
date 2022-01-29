/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import { connectDatabase } from "../src/database";

const clear = async () => {
  try {
    console.log("[clear] : running...");

    const db = await connectDatabase();

    const orderings = await db.orderings.find({}).toArray();
    const listings = await db.listings.find({}).toArray();
    const users = await db.users.find({}).toArray();

    if (orderings.length > 0) {
      await db.orderings.drop();
    }

    if (listings.length > 0) {
      await db.listings.drop();
    }

    if (users.length > 0) {
      await db.users.drop();
    }

    console.log("[clear] : success");
  } catch {
    throw new Error("failed to clear database");
  }
};

clear();
