import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";

import { ClassProfile, ClassSchedule, ConsultantProfile } from "../../graphQL/types";

interface Props {
  classType: string;
  classes: Class[];
  illuminator: number
}

export interface Class {
  class_profile: ClassProfile;
  class_schedule: ClassSchedule;
  consultant_profile: ConsultantProfile;
}

interface State {
  inPersonClasses: Class[];
  inPersonClassesFiltered: Class[];
  isInPersonClassesFiltered: boolean;
  onlineClasses: Class[];
  onlineClassesFiltered: Class[];
  isOnlineClassesFiltered: boolean;
}

const ClassList: React.FC<Props> = ({ classType, classes, illuminator }) => {

  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <h4>In Person Classes</h4>
            {classes &&
              classes.filter(cl=>!cl.class_schedule.class_is_online).map((c, i) => (
                <Col md={12} className={c.consultant_profile.consultant_profile_user_id === illuminator ? "class-card illuminated" : "class-card"} key={i}>
                  <ClassCard classData={c} isOnline={false} isOnlineText="In-Person, Live Instructor-led Class" />
                </Col>
              ))}
          </Col>
          <Col lg={6}>
            <h4>Online Classes</h4>
            {classes &&
              classes.filter(cl=>cl.class_schedule.class_is_online).map((c, i) => (
                <Col md={12} className={c.consultant_profile.consultant_profile_user_id === illuminator ? "class-card illuminated" : "class-card"} key={i}>
                  <ClassCard classData={c} isOnline={true} isOnlineText="In-Person, Live Instructor-led Class" />
                </Col>
              ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
