import React from "react";
import "./bootstrap.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps
} from "react-router-dom";

// components
import AdminNavigation from "./components/Navigation/AdminNavigation";
import Footer from "./components/Footer/Footer";
import AdminHomePage from "./pages/admin/AdminHomePage";

// pages

interface Props extends RouteComponentProps {}

const ClientRoot: React.FC<Props> = () => {
  return (
    <Router>
      <AdminNavigation />
      <Switch>
        <Route
          exact
          path="/admin"
          render={props => <AdminHomePage {...props} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default ClientRoot;
