import React, { useEffect, useState } from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/client";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";

const App: React.FC = () => {
  const client = createApolloClient();

  const [testField, setTestField] = useState(0)

  function addOne(){
    let newNumber = testField
    setTestField(newNumber++)
    console.log(testField)
  }

  useEffect(()=> {
    addOne();
  }, [])

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          {/* there use to be two roots, but I moved the admin into client in order for it to work */}
          <Route path="/" render={props => <ClientRoot {...props} />} />
        </Switch>
        <Footer />
      </Router>
    </ApolloProvider>
  );
};

export default App;
