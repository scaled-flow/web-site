import React from "react";

import { Class } from "./ClassList";
import { Row, Col, Image } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./ClassCard.css";
import { Link } from "react-router-dom";
interface Props {
  classData: Class;
  isOnline: string;
}

const ClassCard: React.FC<Props> = ({ classData, isOnline }) => {
  return (
    <>
      <Row>
        <Col xs={2}>date</Col> {/* TODO: get date from API */}
        <Col xs={6}>
          <h6>{classData.ClassTitle}</h6>
          <p>dates</p> {/* TODO: get date from API */}
          <p>location</p> {/* TODO: get location from API */}
          <p>{isOnline}</p> {/* TODO: get online info from API */}
        </Col>
        <Col xs={2}>
          <Image src={classData.ProfilePhotoURL} fluid roundedCircle />
        </Col>{" "}
        {/* TODO: get icon src from API */}
        <Col xs={2}>
          <Icon icon={faPlusCircle} size="2x" color="#C4C4C4" />
        </Col>
      </Row>
    </>
  );
};

export default ClassCard;
