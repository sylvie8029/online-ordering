import { gql } from "@apollo/client";

export const USER = gql`
  query User($Id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
    }
  }
`;
