import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Orderings {
    total: Int!
    result: [Ordering!]
  }

  type Ordering {
    id: ID!
    listing: Listing!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }

  enum ListingType {
    CHINESE
    KOREA
    JAPANESE
    AMERICAN
    INDIA
  }

  type Listing {
    id: ID!
    dishName: String!
    image: String!
    price: Int!
    rating: Int!
    cooker: String!
    type: ListingType!
    orderings(limit: Int!, page: Int!): Orderings
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    hasWallet: Boolean!
    orderings(limit: Int!, page: Int!): Orderings
    listings(limit: Int!, page: Int!): Listings!
  }

  type Register {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
  }

  type Mutation {
    logIn(input: LogInInput): Register!
    logOut: Register!
  }
  input LogInInput {
    code: String!
  }
`;
