import merge from "lodash.merge";
// import { listingResolvers } from "./Listing";
import { registerResolvers } from "./Register";
// import { bookingResolvers } from "./Booking";
// import { listingResolvers } from "./Listing";
// import { userResolvers } from "./User";

export const resolvers = merge(registerResolvers);
