import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
// import { ApolloProvider } from "@apollo/react-hooks";
const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri:
        "http://ec2-3-135-210-7.us-east-2.compute.amazonaws.com:8080/v1/graphql"
    }),
    cache: new InMemoryCache()
  });
};

export { createApolloClient };
