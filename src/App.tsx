import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

// components
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// pages
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";

const App: React.FC = () => {
   return (
      <Router>
         <Navbar />
         <Container>
            <Switch>
               <Route exact path="/" render={props => <HomePage />} />
               <Route
                  path="/about"
                  render={props => (
                     <AboutPage {...props} someCustomProp="hello" />
                  )}
               />
            </Switch>
         </Container>
         <Footer />
      </Router>
   );
};

export default App;
