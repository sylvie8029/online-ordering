import { Collection, ObjectId } from "mongodb";
export interface Listing {
  _id: ObjectId;
  productName: string;
  image: string;
  price: number;
  rating: number;
}
export interface Database {
  listings: Collection<Listing>;
}
