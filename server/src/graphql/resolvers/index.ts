import merge from "lodash.merge";
import { registerResolvers } from "./Register";
import { orderingResolvers } from "./Ordering";
import { listingResolvers } from "./Listing";
import { userResolvers } from "./User";

export const resolvers = merge(userResolvers, registerResolvers, listingResolvers, orderingResolvers);
