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
import AssessmentsPage from "./pages/AssessmentsPage";
import CoachingPage from "./pages/CoachingPage";
import TrainingPage from "./pages/TrainingPage";
import TrendsPage from "./pages/TrendsPage";
import ContactPage from "./pages/ContactPage";

const App: React.FC = () => {
   return (
      <Router>
         <Navbar />
         <Switch>
            <Route exact path="/" render={props => <HomePage {...props} />} />
            <Route path="/about" render={props => <AboutPage {...props} />} />
            <Route
               path="/assessments"
               render={props => <AssessmentsPage {...props} />}
            />
            <Route
               path="/coaching"
               render={props => <CoachingPage {...props} />}
            />
            <Route
               path="/training"
               render={props => <TrainingPage {...props} />}
            />
            <Route path="/trends" render={props => <TrendsPage {...props} />} />
            <Route
               path="/contact"
               render={props => <ContactPage {...props} />}
            />
         </Switch>
         <Footer />
      </Router>
   );
};

export default App;
