import { Ordering, Listing } from "../../../lib/types";

export interface UserArgs {
  id: string;
}

export interface UserOrderingsArgs {
  limit: number;
  page: number;
}

export interface UserOrderingsData {
  total: number;
  result: Ordering[];
}
export interface UserListingsArgs {
  limit: number;
  page: number;
}

export interface UserListingsData {
  total: number;
  result: Listing[];
}
