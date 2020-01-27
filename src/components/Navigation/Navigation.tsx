import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation: React.FC = () => {
   return (
      <Navbar bg="info" expand="lg">
         <Container>
            <Navbar.Brand>
               <Link to="/">SCALED FLOW &reg;</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ml-auto">
                  <Link to="/about">ABOUT</Link>

                  <Link to="/assessments">ASSESSMENTS</Link>

                  <Link to="/coaching">COACHING</Link>

                  <Link to="/training">TRAINING</Link>

                  <Link to="/trends">TRENDS</Link>

                  <Link to="/contact">CONTACT</Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Navigation;
