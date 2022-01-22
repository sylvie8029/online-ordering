import React from "react";
import { server } from "../../lib/api";
import { DeleteListingData, DeleteListingVariables, ListingsData } from "./types";
// import { gql } from "@apollo/client";

const LISTINGS = `
  query Listings {
    listings {
      id
      image
      productName
      price
      rating
    }
  }
`;
const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;
interface Props {
  productName: string;
}

export const Listings = ({ productName }: Props) => {
  const fetchListings = async () => {
    const data = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(`data:`, data);
  };

  const deleteListing = async () => {
    const data = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id: "61eb7e5545c93daaf35726c6",
      },
    });
    console.log(`data:`, data);
  };
  return (
    <div>
      <h2>{productName}</h2>
      <button onClick={fetchListings}>Query Listings!</button>
      <button onClick={deleteListing}>Delete Listings!</button>
    </div>
  );
};
