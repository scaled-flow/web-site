import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/react-hooks";

// components
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";
import AdminRoot from "./AdminRoot";

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
