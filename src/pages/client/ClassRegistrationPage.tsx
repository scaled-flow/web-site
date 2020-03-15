import React, { useState, useEffect } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Class } from "../../components/TrainingClasses/ClassList";
import moment from "moment";

import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import RegistrationInfo from "../../components/Registration/RegistrationInfo";
import RegistrationForm from "../../components/Registration/RegistrationForm";

interface Props extends RouteComponentProps {}

const ClassRegistrationPage: React.FC<Props> = ({ location, history, ...props }) => {
  const [classInfo, setClassInfo] = useState<Class>();

  useEffect(() => {
    setClassInfo(location.state as Class);
    if (location.state === undefined) {
      history.replace("/");
    }
  }, [location]);

  console.log(classInfo);
  return (
    <>
      <ContentContainer>
        <Container>
          <RegistrationInfo classInfo={classInfo} />
          <RegistrationForm />
        </Container>
      </ContentContainer>
    </>
  );
};

export default ClassRegistrationPage;
