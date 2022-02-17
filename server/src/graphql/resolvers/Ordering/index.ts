import { Database, Listing } from "./../../../lib/types";
import { IResolvers } from "apollo-server-express";
import { Ordering } from "../../../lib/types";

export const orderingResolvers: IResolvers = {
  Ordering: {
    id: (ordering: Ordering): string => {
      return ordering._id.toString();
    },
    listing: (ordering: Ordering, _args: null, db: Database): Promise<Listing | null> => {
      return db.listings.findOne({ _id: ordering.listing });
    },
  },
};
