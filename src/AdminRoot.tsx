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

// pages
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminContact from "./pages/admin/AdminContact";
import AdminProfiles from "./pages/admin/AdminProfiles";
import AdminSchedule from "./pages/admin/AdminSchedule";
import AdminPayment from "./pages/admin/AdminPayment";
import AdminPullTables from "./pages/admin/AdminPullTables";
import AdminRegistration from "./pages/admin/AdminRegistration";

// authentication components
// import { withAuthenticator } from 'aws-amplify-react';

interface Props {}

const AdminRoot: React.FC<Props> = () => {
  return (
    <Router>
      <AdminNavigation />
      <Switch>
        <Route
          exact
          path="/admin"
          render={props => <AdminHomePage {...props} />}
        />
        <Route
          path="/admin/contact"
          render={props => <AdminContact {...props} />}
        />
        <Route
          path="/admin/profiles"
          render={props => <AdminProfiles {...props} />}
        />
        <Route
          path="/admin/schedule"
          render={props => <AdminSchedule {...props} />}
        />
        <Route
          path="/admin/payment"
          render={props => <AdminPayment {...props} />}
        />
        <Route
          path="/admin/pull-tables"
          render={props => <AdminPullTables {...props} />}
        />
        <Route
          path="/admin/registration"
          render={props => <AdminRegistration {...props} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default AdminRoot;
// export default withAuthenticator(ClientRoot);
