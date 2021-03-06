import React from "react";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route, RouteComponentProps } from "react-router-dom";

// components
import Navbar from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";

// pages
import AboutPage from "./pages/client/AboutPage";
import HomePage from "./pages/client/HomePage";
import AssessmentsPage from "./pages/client/AssessmentsPage";
import TrainingPage from "./pages/client/TrainingPage";
import BlogPage from "./pages/client/BlogPage";
import ContactPage from "./pages/client/ContactPage";
import ServicesPage from "./pages/client/ServicesPage";
import ClassRegistrationPage from "./pages/client/ClassRegistrationPage";

import AdminAuthWrapper from "./components/Auth/AdminAuthWrapper";
import PurchaseComplete from "./pages/client/PurchaseComplete";

interface Props extends RouteComponentProps {}

const ClientRoot: React.FC<Props> = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        {/* These are all the major pages */}
        <Route exact path="/" render={props => <HomePage {...props} />} />
        {/* Admin Root */}
        <Route path="/admin" render={props => <AdminAuthWrapper {...props} />} />
        <Route path="/about" render={props => <AboutPage {...props} />} />
        <Route path="/assessment" render={props => <AssessmentsPage {...props} />} />
        <Route path="/training/:id" render={props => <TrainingPage {...props} />} />
        {/* <Route path="/blog" render={props => <BlogPage {...props} />} /> */}
        <Route
          path="/blog/:blogHeadline/:blogDate/:blogID"
          render={props => <BlogPage blogID={props.match.params.blogID} {...props} />}
        />
        <Route path="/services" render={props => <ServicesPage {...props} />} />
        <Route path="/contact" render={props => <ContactPage {...props} />} />
        <Route
          path="/register/:classId/:scheduleID/:consultantId/:className/:isOnline"
          render={props => (
            <ClassRegistrationPage
              classId={props.match.params.classId}
              scheduleId={props.match.params.scheduleID}
              consultantId={props.match.params.consultantId}
              isOnline={props.match.params.isOnline}
            />
          )}
        />
        <Route path="/complete" render={props => <PurchaseComplete {...props} />} />
      </Switch>
      {/* <Footer /> */}
    </Router>
  );
};

export default ClientRoot;
