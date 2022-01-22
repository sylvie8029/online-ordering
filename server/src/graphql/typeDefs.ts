import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Listing {
    id: ID!
    productName: String!
    image: String!
    price: Int!
    rating: Int!
  }

  type Query {
    listings: [Listing!]!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }
`;
