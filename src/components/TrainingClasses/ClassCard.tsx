import React from "react";

import { Class } from "./ClassList";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ClassCard.css";
import { Link } from "react-router-dom";
interface Props {
  classData: Class;
}

const ClassCard: React.FC<Props> = ({ classData }) => {
  return (
    <>
      <div className="class-card">
        <Row>
          <Col xs={2}>date</Col>
          <Col xs={7}>content</Col>
          <Col xs={2}>icon</Col>
          <Col xs={1}>plus</Col>
        </Row>
      </div>
    </>
  );
};

export default ClassCard;
