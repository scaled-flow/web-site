import React, { useEffect } from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";

const App: React.FC = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/" render={props => <ClientRoot {...props} />} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
