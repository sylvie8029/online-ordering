import { ObjectId } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (_root: undefined, __, db: Database): Promise<Listing[]> => {
      // console.group("listings resolver");
      // console.log(`db:`, db);
      // console.groupEnd();
      // console.log(`db.listings: ${db.listings}`);
      return await db.listings.find({}).toArray();
    },
  },
  Mutation: {
    deleteListing: async (_root: undefined, id: string, db: Database): Promise<Listing> => {
      const deleteRes = await db.listings.findOneAndDelete({
        _id: new ObjectId(id),
      });

      if (!deleteRes.value) {
        throw new Error("failed to delete listing");
      }

      return deleteRes.value;
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
