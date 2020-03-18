import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://ec2-3-135-210-7.us-east-2.compute.amazonaws.com:8080/v1/graphql"
    }),
    cache: new InMemoryCache()
  });
};

export { createApolloClient };
