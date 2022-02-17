import { gql } from "@apollo/client";

export const USER = gql`
  query User($id: ID!, $orderingsPage: Int!, $listingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      orderings(limit: $limit, page: $orderingsPage) {
        total
        result {
          id
          listing {
            id
            dishName
            image
            price
            rating
            type
          }
        }
      }
      listings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          dishName
          image
          price
          type
          rating
        }
      }
    }
  }
`;
