import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GetInstructors } from "../../graphQL/queries";
import { ConsultantProfile } from "../../graphQL/types";
import "./TrainingClasses.css";

interface Props {
  classURL: string;
}

const Instructors: React.FC<Props> = ({ classURL }) => {
  const [classId, setClassId] = useState<number>(0);
  const [classType, setClassType] = useState<string>("");
  const [instructors, setInstructors] = useState<ConsultantProfile[]>([] as ConsultantProfile[]);

  const { loading, error, data, refetch } = useQuery(GetInstructors(classId));

  useEffect(() => {
    refetch();
  }, [classId]);

  useEffect(() => {
    setInstructors(!loading ? data.consultant_profiles : []);
  }, [loading, error, data]);

  useEffect(() => {
    if (classURL === "/training/scaled-agile") {
      setClassId(1);
      setClassType("SaFE");
    } else {
      setClassId(2);
      setClassType("LeSS");
    }
  }, [classURL]);

  console.log(instructors);
  return (
    <>
      <Container>
        <Row className="instructors">
          <Col>
            <h1>{classType} Instructors</h1>
          </Col>
        </Row>
        <Row>
          {instructors.map((instructor, i) => (
            <Col md={4} className="text-center" key={i}>
              <h3>
                {instructor.first_name} {instructor.last_name}
              </h3>
              <h6>{instructor.job_title}</h6>
              <img className="img-circle" src={instructor.profile_photo_url} alt={instructor.profile_photo_alt_text} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Instructors;
