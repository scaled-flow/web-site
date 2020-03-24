import gql from "graphql-tag";

export const typeDefs = gql`
  type Attendee {
    email: String!
    first_name: String!
    last_name: String!
  }
`;
