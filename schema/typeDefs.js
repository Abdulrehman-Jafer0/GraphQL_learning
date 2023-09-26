import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type Query {
    validate(token: String!): User
  }

  type Mutation {
    signIn(username: String!, password: String!): String!
    createUser(
      username: String!
      password: String!
      confirmPassword: String!
    ): String!
  }
`;
