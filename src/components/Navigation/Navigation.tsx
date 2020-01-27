import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

import "./Navigation.css";

const Navigation: React.FC = () => {
   return (
      <Navbar bg="info" expand="lg">
         <Container>
            <Navbar.Brand href="#home">SCALED FLOW &reg;</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
               <Nav className="ml-auto">
                  <Nav.Link href="#ABOUT">ABOUT</Nav.Link>
                  <Nav.Link href="#ASSESSMENTS">ASSESSMENTS</Nav.Link>
                  <Nav.Link href="#COACHING">COACHING</Nav.Link>
                  <Nav.Link href="#TRAINING">TRAINING</Nav.Link>
                  <Nav.Link href="#TRENDS">TRENDS</Nav.Link>
                  <Nav.Link href="#CONTACT">CONTACT</Nav.Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>
   );
};

export default Navigation;
