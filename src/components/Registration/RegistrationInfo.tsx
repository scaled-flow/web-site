import React from "react";

import { Row, Col, Image } from "react-bootstrap";
import moment from "moment";
import GoogleMapReact from "google-map-react";

import { Class } from "../TrainingClasses/ClassList";

interface Props {
  classInfo: Class | undefined;
}

const RegistrationInfo: React.FC<Props> = ({ classInfo }) => {
  return (
    <>
      <Row className="mt-5">
        <Col>
          <h2 className="text-center">
            {classInfo?.class_profile.class_title} | {classInfo?.class_schedule.class_in_person_city}{" "}
            {classInfo?.class_schedule.class_in_person_state}|{" "}
            {moment(classInfo?.class_schedule.class_start_date, "YYYY-MM-DD").format("MMMM Do")} -{" "}
            {moment(classInfo?.class_schedule.class_end_date, "YYYY-MM-DD").format("Do, YYYY")}
          </h2>
        </Col>
      </Row>
      <Row className="mt-5 mb-5">
        <Col lg={{ span: 3, offset: 1 }} md={3} className="d-sm-none d-md-block">
          <Image src={`${classInfo?.consultant_profile.profile_photo_url}`} fluid />{" "}
          {/* TODO: Get correct photo from API */}
        </Col>
        <Col lg={6} md={9}>
          <h4>{classInfo?.class_profile.class_desc}</h4>
        </Col>
      </Row>
      <Row className="mb-6">
        <Col md={6}>
          <h6 className="light-grey-header">DATES</h6>
          <p>
            {moment(classInfo?.class_schedule.class_start_date, "YYYY-MM-DD").format("MMMM Do, YYYY")} -{" "}
            {moment(classInfo?.class_schedule.class_end_date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
          </p>
          <h6 className="light-grey-header">TIME</h6>
          <p>{moment(classInfo?.class_schedule.class_start_time, "HH:mm:ss").format("hh:mm A")} - End Time</p>{" "}
          {/* TODO: Get end time from API */}
          <h6 className="light-grey-header">LOCATION</h6>
          <p>
            Address First Line <br />
            {classInfo?.class_schedule.class_in_person_city}, {classInfo?.class_schedule.class_in_person_state}
          </p>
        </Col>
        <Col md={6}>
          <GoogleMapReact
            style={{ height: "40vh" }}
            defaultCenter={{ lat: 40.73, lng: -73.93 }}
            center={{ lat: 40.73, lng: -73.93 }}
            defaultZoom={12}
            bootstrapURLKeys={{
              key: "AIzaSyCO4HQ79ljCkv2SP0B1cK31q8M4nVx6qUQ",
              language: "en"
            }}
          />
          {/* TODO: get proper google maps API key */}
          {/* TODO: set up coords in back end */}
        </Col>
      </Row>
    </>
  );
};

export default RegistrationInfo;
