import React from "react";
import "./bootstrap.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";

// components
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// pages
import AboutPage from "./pages/client/AboutPage";
import HomePage from "./pages/client/HomePage";
import AssessmentsPage from "./pages/client/AssessmentsPage";
import CoachingPage from "./pages/client/CoachingPage";
import TrainingPage from "./pages/client/TrainingPage";
import TrendsPage from "./pages/client/TrendsPage";
import ContactPage from "./pages/client/ContactPage";

interface Props extends RouteComponentProps {}

const ClientRoot: React.FC<Props> = () => {
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
        <Route path="/coaching" render={props => <CoachingPage {...props} />} />
        <Route path="/training" render={props => <TrainingPage {...props} />} />
        <Route path="/trends" render={props => <TrendsPage {...props} />} />
        <Route path="/contact" render={props => <ContactPage {...props} />} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default ClientRoot;
