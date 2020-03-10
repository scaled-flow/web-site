import React from "react";

import { Row, Col, Image } from "react-bootstrap";
import moment from "moment";

import { Class } from "../TrainingClasses/ClassList";

interface Props {
  classInfo: Class | undefined;
}

const RegistrationInfo: React.FC<Props> = ({ classInfo }) => {
  return (
    <>
      <Row className="mt-5">
        <Col md={3}>
          <Image src={`${classInfo?.profile_photo_url}`} fluid /> {/* TODO: Get correct photo from API */}
        </Col>
        <Col md={9}>
          <h3>{classInfo?.class_desc}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="text-center">
            {classInfo?.class_title} | {classInfo?.class_in_person_city} {classInfo?.class_in_person_state}|{" "}
            {moment(classInfo?.class_start_date, "YYYY-MM-DD").format("MMMM Do")} -{" "}
            {moment(classInfo?.class_end_date, "YYYY-MM-DD").format("Do, YYYY")}
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h6 className="light-grey-header">DATES</h6>
          <p>
            {moment(classInfo?.class_start_date, "YYYY-MM-DD").format("MMMM Do, YYYY")} -{" "}
            {moment(classInfo?.class_end_date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
          </p>
          <h6 className="light-grey-header">TIME</h6>
          <p>{moment(classInfo?.class_start_time, "HH:mm:ss").format("hh:mm A")} - End Time</p>{" "}
          {/* TODO: Get end time from API */}
          <h6 className="light-grey-header">LOCATION</h6>
          <p>
            Address First Line <br />
            {classInfo?.class_in_person_city}, {classInfo?.class_in_person_state}
          </p>
        </Col>
        <Col md={6}>map</Col>
      </Row>
    </>
  );
};

export default RegistrationInfo;
