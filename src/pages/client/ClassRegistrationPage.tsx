import React, { useState, useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Class } from "../../components/TrainingClasses/ClassList";
import moment from "moment";

import Header from "../../components/Header/Header";
import RegistrationInfo from "../../components/Registration/RegistrationInfo";

interface Props extends RouteComponentProps {}

const ClassRegistrationPage: React.FC<Props> = ({ location, ...props }) => {
  const [classInfo, setClassInfo] = useState<Class>();

  useEffect(() => {
    setClassInfo(location.state as Class);
  }, []);
  console.log(classInfo);
  return (
    <>
      <Header title="Register" />
      <Container>
        <RegistrationInfo classInfo={classInfo} />
      </Container>
    </>
  );
};

export default ClassRegistrationPage;
