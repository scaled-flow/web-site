import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";

import { GET_INSTRUCTORS } from "../../graphQL/queries";
import { ConsultantProfile } from "../../graphQL/types";
import "./TrainingClasses.css";

interface Props {
  instructorIds: number[];
  classType: string;
  setIlluminator: React.Dispatch<React.SetStateAction<number>>;
}

const Instructors: React.FC<Props> = ({ instructorIds, classType, setIlluminator }) => {
  const [instructors, setInstructors] = useState<ConsultantProfile[]>([] as ConsultantProfile[]);

  const { loading, error, data } = useQuery(GET_INSTRUCTORS, {variables: {ids: instructorIds}});

  useEffect(() => {
    !loading && !error && setInstructors(data.consultant_profiles)
  },[loading, error, data])

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
            <Col md={4} className="text-center" key={i} onTouchStartCapture={() => setIlluminator(instructor.consultant_profile_user_id)} onMouseEnter={() => setIlluminator(instructor.consultant_profile_user_id)} onMouseLeave={()=>{setIlluminator(0)}}>
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
