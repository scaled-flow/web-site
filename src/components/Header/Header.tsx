import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";

interface Props {
   title: string;
}

const Header: React.FC<Props> = ({ title }: Props) => {
   return (
      <header className="header">
         <div className="dark-overlay">
            <Container className="home-inner">
               <Row>
                  <Col className="text-center">
                     <h1 style={{ marginTop: "90px", color: "white" }}>
                        {title}
                     </h1>
                  </Col>
               </Row>
            </Container>
         </div>
      </header>
   );
};

export default Header;
