import { Collection, ObjectId } from "mongodb";
export enum ListingType {
  Classic = "CLASSIC",
  Modern = "MODERN",
}

export interface Listing {
  _id: ObjectId;
  productName: string;
  image: string;
  price: number;
  rating: number;
  type: ListingType;
}

export interface Purchasing {
  _id: ObjectId;
}
export interface User {
  _id: string;
  token: string;
  name: string;
  avatar: string;
  contact: string;
  walletId?: string;

  purchasings: ObjectId[];
  listings: ObjectId[];
}
export interface Database {
  purchasings: Collection<Purchasing>;
  listings: Collection<Listing>;
  users: Collection<User>;
}
