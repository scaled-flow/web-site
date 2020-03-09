import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";

// queries
import { GET_IN_PERSON_CLASSES } from "../../graphQL/queries";
import { useQuery } from "@apollo/react-hooks";

interface Props {}
interface Props {
  classType: string;
}

export interface Class {
  class_start_date: string;
  class_end_date: string;
  class_title: string;
  class_in_person_city?: string;
  class_in_person_state?: string;
  class_is_in_person: boolean;
  profile_photo_url: string;
  class_start_time?: string;
}

const ClassList: React.FC<Props> = ({ classType }) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [classesFiltered, setClassesFiltered] = useState<Class[]>([]);
  const [isFiltered, setIsFiltered] = useState(true);

  const { loading, error, data } = useQuery(GET_IN_PERSON_CLASSES);

  useEffect(() => {
    console.log(!error ? "no error" : error);
    const temp = !loading && data.class_consultant_schedule_view_aggregate.nodes;
    setClasses(temp);
  }, [loading, error, data]);

  useEffect(() => {
    const temp = classes.length > 0 ? classes.filter((c, i) => i < 5) : [];
    setClassesFiltered(temp);
  }, [classes]);

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
