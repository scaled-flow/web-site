import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";

// queries
import { GET_IN_PERSON_CLASSES } from "../../graphQL/queries";
import { useQuery } from "@apollo/client";
import { ClassProfile, ClassSchedule, ConsultantProfile } from "../../graphQL/types";

interface Props {}
interface Props {
  classType: string;
}

export interface Class {
  class_profile: ClassProfile;
  class_schedule: ClassSchedule;
  consultant_profile: ConsultantProfile;
}

const ClassList: React.FC<Props> = ({ classType }) => {
  const [classes, setClasses] = useState<Class[]>([] as Class[]);
  const [classesFiltered, setClassesFiltered] = useState<Class[]>([]);
  const [isFiltered, setIsFiltered] = useState(true);

  const { loading, error, data } = useQuery(GET_IN_PERSON_CLASSES);

  useEffect(() => {
    console.log(!error ? "no error" : error);
    const temp = !loading && data.consultant_profiles_link_class_profiles_link_class_schedules;

    setClasses(temp);
  }, [loading, error, data]);

  useEffect(() => {
    const temp = classes.length > 0 ? classes.filter((c, i) => i < 2) : [];
    isFiltered ? setClassesFiltered(temp) : setClassesFiltered(classes);
  }, [classes, isFiltered]);

  console.log(classes);
  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <h4>In Person Classes</h4>
            {classesFiltered.map((c, i) => (
              <Col md={12} className="class-card" key={i}>
                <ClassCard classData={c} isOnline="In-Person, Live Instructor-led Class" />
              </Col>
            ))}
          </Col>
          <Col lg={6}>
            <h4>Online Classes</h4>
            {classesFiltered.map((c, i) => (
              <Col md={12} className="class-card" key={i}>
                <ClassCard classData={c} isOnline="Online, Live Instructor-led Class" />
              </Col>
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <button className="link-styled-button" onClick={() => setIsFiltered(!isFiltered)}>
              {isFiltered ? "See More Classes" : "See Fewer Classes"}
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
