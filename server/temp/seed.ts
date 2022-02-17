/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Listing, ListingType, User } from "../src/lib/types";

const seed = async () => {
  try {
    console.log(`[seed] : running...`);

    const db = await connectDatabase();
    const users: User[] = [
      {
        _id: "107930296587405991735",
        token: "342f20ac2f419ea6c905531ff9a2f302",
        name: "wylian",
        avatar: "https://lh3.googleusercontent.com/a/AATXAJxTgkHbhQ8NZVLXRpzm_Y5Ps0LY8Y...",
        contact: "wylian.sylvie@gmail.com",
        orderings: [new ObjectId("61f2e302c64e5d7ff9f8fb7f")],
        listings: [new ObjectId("61f2e302c64e5d7ff9f8fb80")],
      },
    ];
    const listings: Listing[] = [
      {
        _id: new ObjectId(),
        dishName: "gongbaojiding",
        image: "image001",
        price: 10,
        rating: 1,
        type: ListingType.Chinese,
        cooker: "107930296587405991735",
        orderings: [],
      },
      {
        _id: new ObjectId(),
        dishName: "pizza",
        image: "image002",
        price: 20,
        rating: 2,
        type: ListingType.American,
        cooker: "107930296587405991735",
        orderings: [],
      },
      {
        _id: new ObjectId(),
        dishName: "sushi",
        image: "image003",
        price: 30,
        rating: 3,
        type: ListingType.Japanese,
        cooker: "japan",
        orderings: [],
      },
    ];

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    for (const user of users) {
      await db.users.insertOne(user);
    }

    console.log(`[seed] : success`);
  } catch (error) {
    throw new Error("failed to seed database");
  }
};

seed();
