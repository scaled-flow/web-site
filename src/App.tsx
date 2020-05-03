import React, { useState, useEffect } from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import config from './config';

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/client";
import { Auth } from "aws-amplify";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";

const App: React.FC = () => {
  const [isNotAuthenticated, setIsNotAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuth()
  }, [])

  function checkAuth() {
    setTimeout(() => {
      Auth.currentSession()
        .then(function (data) {
          if (data.getAccessToken().payload["cognito:groups"][0] !== "admin") {
            setIsNotAuthenticated(true);
          }
        })
        .catch(err => console.log(err));
    }, 1000)
  }


  switch (isNotAuthenticated) {
    case false:
      return (
        <ApolloProvider client={createApolloClient(config.REACT_APP_ALLOWED_STRING)}>
          <Router>
            <Switch>
              {/* there use to be two roots, but I moved the admin into client in order for it to work */}
              <Route path="/" render={props => <ClientRoot {...props} />} />
            </Switch>
            <Footer />
          </Router>
        </ApolloProvider>
      );
    case true:
      return (
        <ApolloProvider client={createApolloClient(config.REACT_APP_RESTRICTED_STRING)}>
          <Router>
            <Switch>
              {/* there use to be two roots, but I moved the admin into client in order for it to work */}
              <Route path="/" render={props => <ClientRoot {...props} />} />
            </Switch>
            <Footer />
          </Router>
        </ApolloProvider>
      );
  }
};

export default App;