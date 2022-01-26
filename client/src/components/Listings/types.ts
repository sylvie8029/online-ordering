export interface Listing {
  id: string;
  dishName: string;
  image: string;
  price: number;
  rating: number;
}

export type ListingsData = {
  listings: Listing[];
};

export interface DeleteListingData {
  deleteListing: Listing;
}

export interface DeleteListingVariables {
  id: string;
}
