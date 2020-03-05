import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

const AdminNavigation: React.FC = () => {
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
            <Link className="navlink" to="/admin/profiles">
              PROFILES
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavigation;
