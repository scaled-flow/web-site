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
          <Col md={4}>
            <h4 style={{ color: "white" }}>{classData.ClassTitle}</h4>
            <p>{classData.ClassTitle}</p>
            <p>{classData.ClassDescription}</p>
            <Link
              to={`/class/${classData.ClassTitle.split(" ").join("-")}-${
                classData.ClassID
              }`}
              style={{ color: "white" }}
            >
              More Info
            </Link>
          </Col>
          <Col md={4}>
            <p>
              Teacher: {classData.FirstName} {classData.LastName} -{" "}
              {classData.JobTitle}
            </p>
          </Col>
          <Col md={2}>
            <Image
              src={classData.ProfilePhotoURL}
              roundedCircle
              style={{ width: 100 }}
            />
          </Col>
          <Col md={2}>
            <div className="align-middle">
              <Icon
                icon={faPlus}
                color="white"
                size="3x"
                className="plus-icon"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassCard;
