import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql.testscaledflow.com/v1/graphql"
    }),
    cache: new InMemoryCache()
  });
};

export { createApolloClient };
