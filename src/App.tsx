import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//analytics
//@ts-ignore
import analytics from "analytics"

// graphql
import { createApolloClient } from "./graphQL/createApolloClient";
import { ApolloProvider } from "@apollo/client";

// components
import Footer from "./components/Footer/Footer";

// pages
import ClientRoot from "./ClientRoot";

//@ts-ignore
// window.analytics.track('Scaled Flow Segment', {
//   plan: 'Enterprise'
// });


//ask user for cookie preferences if haven't already
// let preference = JSON.parse(localStorage.getItem("cookies"))
// if (preference === null){
//   const cookiesOrNah = window.confirm("Accept cookies?")
//   console.log(cookiesOrNah)
//   localStorage.setItem("cookies", JSON.stringify(cookiesOrNah))
// }

const App: React.FC = () => {
  const client = createApolloClient();

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
