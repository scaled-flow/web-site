import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
         <Switch>
            <Route exact path="/">
               <HomePage />
            </Route>
            <Route path="/about">
               <AboutPage />
            </Route>
         </Switch>
         <Footer />
      </Router>
   );
};

export default App;
