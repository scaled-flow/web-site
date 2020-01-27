import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
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
            <Route exact path="/about">
               <AboutPage />
            </Route>
         </Switch>
         <Footer />
      </Router>
   );
};

export default App;
