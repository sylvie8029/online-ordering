import { Collection, ObjectId } from "mongodb";

export interface Register {
  _id?: string;
  token?: string;
  avatar?: string;
  walletId?: string;
  didRequest: boolean;
}

export enum ListingType {
  Chinese = "CHINESE",
  Korea = "KOREA",
  Japanese = "JAPANESE",
  American = "AMERICAN",
  India = "INDIA",
}

export interface Listing {
  _id: ObjectId;
  dishName: string;
  image: string;
  price: number;
  rating: number;
  author: string;

  type: ListingType;
  orderings: ObjectId[];
}

export interface Ordering {
  _id: ObjectId;
  listing: ObjectId;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;

  orderings: ObjectId[];
  listings: ObjectId[];
}
export interface Database {
  orderings: Collection<Ordering>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
