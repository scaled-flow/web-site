import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client";
const createApolloClient = (role: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://graphql.testscaledflow.com/v1/graphql",
      headers: {'X-Hasura-Role' : role}
    }),
    cache: new InMemoryCache()
  });
};

export { createApolloClient };
