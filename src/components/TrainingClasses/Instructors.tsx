import React from "react";
import { Container, Col, Row, Image } from "react-bootstrap";

interface Props {}

const Instructors: React.FC<Props> = () => {
  return (
    <>
      <Container>
        <Row>
          <Col></Col>
        </Row>
        <Row className="instructors">
          <Col md={4} className="text-center">
            <Image src="http://www.fillmurray.com/150/150" roundedCircle />{" "}
            {/* TODO: get this URL from API */}
            <h3>Trainer A</h3>
            <Image src="http://www.fillmurray.com/200/200" />
            {/* TODO: get this URL from API */}
          </Col>
          <Col md={4} className="text-center">
            <Image src="http://www.fillmurray.com/150/150" roundedCircle />{" "}
            {/* TODO: get this URL from API */}
            <h3>Trainer B</h3>
            <Image src="http://www.fillmurray.com/200/200" />
            {/* TODO: get this URL from API */}
          </Col>
          <Col md={4} className="text-center">
            <Image src="http://www.fillmurray.com/150/150" roundedCircle />{" "}
            {/* TODO: get this URL from API */}
            <h3>Trainer C</h3>
            <Image src="http://www.fillmurray.com/200/200" />
            {/* TODO: get this URL from API */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Instructors;
