/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_orderings_result_listing {
  __typename: "Listing";
  id: string;
  dishName: string;
  image: string;
  price: number;
  rating: number;
  type: ListingType;
}

export interface User_user_orderings_result {
  __typename: "Ordering";
  id: string;
  listing: User_user_orderings_result_listing;
}

export interface User_user_orderings {
  __typename: "Orderings";
  total: number;
  result: User_user_orderings_result[] | null;
}

export interface User_user_listings_result {
  __typename: "Listing";
  id: string;
  dishName: string;
  image: string;
  price: number;
  type: ListingType;
  rating: number;
}

export interface User_user_listings {
  __typename: "Listings";
  total: number;
  result: User_user_listings_result[];
}

export interface User_user {
  __typename: "User";
  id: string;
  name: string;
  avatar: string;
  contact: string;
  hasWallet: boolean;
  orderings: User_user_orderings | null;
  listings: User_user_listings;
}

export interface User {
  user: User_user;
}

export interface UserVariables {
  id: string;
  orderingsPage: number;
  listingsPage: number;
  limit: number;
}
