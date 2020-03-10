import React from "react";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
  return (
    <Navbar bg="info" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/">SCALED FLOW &reg;</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="navlink" to="/about">
              ABOUT
            </Link>
            <Link className="navlink" to="/assessment">
              ASSESSMENTS
            </Link>
            <NavDropdown className="navlink" title="TRAINING" id="nav-dropdown" style={{ padding: 0 }}>
              <Link to="/training/scaled-agile" className="dropdown-link dropdown-item">
                Scaled Agile Training
              </Link>
              <Link to="/training/LeSS" className="dropdown-link dropdown-item">
                LeSS Training
              </Link>
            </NavDropdown>
            <Link className="navlink" to="/blog">
              BLOG
            </Link>
            <Link className="navlink" to="/services">
              SERVICES
            </Link>
            <Link className="navlink" to="/contact">
              CONTACT
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
