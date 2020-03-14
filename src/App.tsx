import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";


const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};

const App: React.FC = () => {
  const client = createApolloClient();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" render={props => <ClientRoot {...props} />} />
          <Route component={NoMatchPage} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
