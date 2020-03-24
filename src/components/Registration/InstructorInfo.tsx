import React from "react";

import { Row, Col, Image } from "react-bootstrap";

import "./Registration.css";
import { Class } from "../../graphQL/types";

interface Props {
  classInfo: Class | undefined;
}

const InstructorInfo: React.FC<Props> = ({ classInfo }) => {
  return (
    <div className="reg-row">
      <Row>
        <Col>
          <h2 className="reg-header">Class Instructor</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4>
            Instructor - {classInfo?.consultant_profile.first_name} {classInfo?.consultant_profile.last_name}
          </h4>
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <Image
            src={classInfo?.consultant_profile.profile_photo_url}
            alt={classInfo?.consultant_profile.profile_photo_alt_text}
          />
        </Col>
        <Col md={9}>
          <p>{classInfo?.consultant_profile.profile_description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default InstructorInfo;
