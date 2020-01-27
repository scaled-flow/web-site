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
                  <Nav.Link>
                     <Link to="/about">ABOUT</Link>
                  </Nav.Link>
                  <Nav.Link>
                     <Link to="/assessments">ASSESSMENTS</Link>
                  </Nav.Link>
                  <Nav.Link>
                     <Link to="/coaching">COACHING</Link>
                  </Nav.Link>
                  <Nav.Link>
                     <Link to="/training">TRAINING</Link>
                  </Nav.Link>
                  <Nav.Link>
                     <Link to="/trends">TRENDS</Link>
                  </Nav.Link>
                  <Nav.Link>
                     <Link to="/contact">CONTACT</Link>
                  </Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Navigation;
