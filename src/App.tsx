import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//analytics
//@ts-ignore
import analytics from "analytics";

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/client";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";

const App: React.FC = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Router>
          <Route path="/" render={props => <ClientRoot {...props} />} />
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
