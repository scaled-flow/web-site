import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Header.css";

import keystone from "../../img/keystone.jpg";
import less from "../../img/less.png";

interface Props {
  title: string;
  description: string;
  type: string;
}

const TrainingHeader: React.FC<Props> = ({ title, description, type }) => {
  return (
    <header className="training-header">
      <div className="overlay">
        <Container className="home-inner">
          <Row>
            <Col className="header-content" md={8}>
              <h3>{title}</h3>
              <h6>{description}</h6>
            </Col>
            <Col md={4} className="d-sm-none d-md-block header-content">
              <Image
                fluid
                alt={type === "SA" ? "Scaled Agile Flow" : "LeSS Framework"}
                src={type === "SA" ? keystone : less}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
};

export default TrainingHeader;
