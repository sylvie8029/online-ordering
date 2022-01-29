import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Register {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  type Query {
    authUrl: String!
  }

  type Mutation {
    logIn(input: LogInInput): Register!
    logOut: Register!
  }
  input LogInInput {
    code: String!
  }
`;
