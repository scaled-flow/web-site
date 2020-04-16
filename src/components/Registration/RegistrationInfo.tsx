import React from "react";

import { Row, Col, Image } from "react-bootstrap";
import moment from "moment";

import { Class } from "../TrainingClasses/ClassList";
import "./Registration.css";

//maps environmental variable
require ('dotenv').config();

interface Props {
  classInfo: Class | undefined;
}

const RegistrationInfo: React.FC<Props> = ({ classInfo }) => {
  return (
    <>
      <div className="reg-row">
        <Row className="mt-5 mb-5">
          <Col md={3} className="d-sm-none d-md-block">
            <Image
              src={`${classInfo?.class_profile.class_image}`}
              alt={`${classInfo?.class_profile.class_title}`}
              fluid
            />
          </Col>
          <Col md={9}>
            <h4>{classInfo?.class_profile.class_desc}</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className="text-center">
              {classInfo?.class_profile.class_title} | {classInfo?.class_schedule.class_in_person_city}{" "}
              {classInfo?.class_schedule.class_in_person_state}|{" "}
              {moment(classInfo?.class_schedule.class_start_date, "YYYY-MM-DD").format("MMMM Do")} -{" "}
              {moment(classInfo?.class_schedule.class_end_date, "YYYY-MM-DD").format("Do, YYYY")}
            </h3>
          </Col>
        </Row>
      </div>
      <div className="reg-row">
        <Row>
          <Col>
            <h2 className="reg-header">Attendee Registration</h2>
          </Col>
        </Row>
        <Row className="mb-6">
          <Col md={6} className="align-self-center">
            <h6 className="light-grey-header">DATES</h6>
            <p>
              {moment(classInfo?.class_schedule.class_start_date, "YYYY-MM-DD").format("MMMM Do, YYYY")} -{" "}
              {moment(classInfo?.class_schedule.class_end_date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
            </p>
            <h6 className="light-grey-header">TIME</h6>
            <p>
              {moment(classInfo?.class_schedule.class_start_time, "HH:mm:ss").format("hh:mm A")} -{" "}
              {moment(classInfo?.class_schedule.class_end_time, "HH:mm:ss").format("hh:mm A")}
            </p>{" "}
            {/* TODO: Get end time from API */}
            <h6 className="light-grey-header">LOCATION</h6>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(
                `${classInfo?.class_schedule.class_in_person_address_01} ${classInfo?.class_schedule.class_in_person_address_02} ${classInfo?.class_schedule.class_in_person_city} ${classInfo?.class_schedule.class_in_person_state} ${classInfo?.class_schedule.class_in_person_zip}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {classInfo?.class_schedule.class_in_person_address_01},{" "}
              {classInfo?.class_schedule.class_in_person_address_02} <br />
              {classInfo?.class_schedule.class_in_person_city}, {classInfo?.class_schedule.class_in_person_state}{" "}
              {classInfo?.class_schedule.class_in_person_zip} <i className="fas fa-map-pin"></i>
            </a>
          </Col>
          <Col md={6} className="map-box">
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{border:0}}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${encodeURI(
                `${classInfo?.class_schedule.class_in_person_address_01} ${classInfo?.class_schedule.class_in_person_address_02} ${classInfo?.class_schedule.class_in_person_city} ${classInfo?.class_schedule.class_in_person_state} ${classInfo?.class_schedule.class_in_person_zip}`
              )}`}>
            </iframe>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RegistrationInfo;
