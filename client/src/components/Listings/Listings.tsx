import React from "react";
import { Listings as ListingsData } from "./__generated__/Listings";
import { DeleteListing as DeleteListingData, DeleteListingVariables } from "./__generated__/DeleteListing";
// import { server } from "../../lib/api";
// import { DeleteListingData, DeleteListingVariables, ListingsData } from "./types";
import { gql, useQuery, useMutation } from "@apollo/client";

const LISTINGS = gql`
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
const DELETE_LISTING = gql`
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
  // const [listings, setListings] = useState<Listing[] | null>(null);
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS);

  // useEffect(() => {
  //   fetchListings();
  // }, []);
  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<DeleteListingData, DeleteListingVariables>(
    DELETE_LISTING
  );
  // const fetchListings = async () => {
  //   const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
  //   setListings(data.listings);
  //   console.log(`data:`, data);
  // };
  // const deleteListing = async (id: string) => {
  //   await server.fetch<DeleteListingData, DeleteListingVariables>({
  //     query: DELETE_LISTING,
  //     variables: {
  //       id,
  //     },
  //   });
  //   fetchListings();
  // };
  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.productName}
            {""}
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong </h2>;
  }

  const deleteListingLoadingMessage = deleteListingLoading ? <h4>Deleting...</h4> : null;

  const deleteListingErrorMessage = deleteListingError ? <h4>something went wrong with deleting</h4> : null;

  return (
    <div>
      <h2>{productName}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
      {/* <button onClick={fetchListings}>Query Listings</button> */}
    </div>
  );
};
