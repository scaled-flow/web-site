import React from "react";

import { Row, Col } from "react-bootstrap";
import "./AdminHero.css";

interface Props {}

const HeroItem: React.FC<Props> = ({ children }) => {
  return (
    <div className="hero-list-item">
      <Row>
        <Col md={6}>
          <p>{children}</p>
        </Col>
        <Col md={2}>
          <p>active/inactive</p>
        </Col>
        <Col md={3}>
          <button>delete</button>
        </Col>
      </Row>
    </div>
  );
};

export default HeroItem;
