import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Register {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }
  type Listing {
    id: ID!
    dishName: String!
    image: String!
    price: Int!
    rating: Int!
  }

  type Query {
    authUrl: String!
    listings: Listing
  }

  type Mutation {
    logIn(input: LogInInput): Register!
    logOut: Register!
    deleteListing: Listing
  }
  input LogInInput {
    code: String!
  }
`;
