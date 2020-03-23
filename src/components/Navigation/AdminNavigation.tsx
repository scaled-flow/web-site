import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";
import { Auth } from "aws-amplify";

const AdminNavigation: React.FC = () => {
  function userSignOut() {
    Auth.signOut()
      .then(data => {console.log(data); window.location.reload();})
      .catch(err => console.log(err));
  }

  return (
    <Navbar bg="danger" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/">SCALED FLOW &reg;</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="navlink" to="/admin/contact">
              CONTACT
            </Link>
            <Link className="navlink" to="/admin/consultants">
              CONSULTANTS
            </Link>
            <Link className="navlink" to="/admin/schedule">
              SCHEDULE
            </Link>
            <Link className="navlink" to="/admin/payment">
              PAYMENT
            </Link>
            <Link className="navlink" to="/admin/pull-tables">
              PULL TABLES
            </Link>
            <Link className="navlink" to="/admin/registration">
              REGISTRATION
            </Link>
            <Link className="navlink" onClick={() => userSignOut()} to="/admin">
              SIGN OUT
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavigation;
