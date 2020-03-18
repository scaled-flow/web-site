import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import { GetClassData } from "../../graphQL/queries";
import { Class } from "../../graphQL/types";
import { useQuery } from "@apollo/react-hooks";

import ContentContainer from "../../components/ContentContainer/ContentContainer";
import RegistrationInfo from "../../components/Registration/RegistrationInfo";
import RegistrationForm from "../../components/Registration/RegistrationForm";

interface Props {
  consultantId: number
  classId: number
  scheduleId: number
}

const ClassRegistrationPage: React.FC<Props> = ({ ...props }) => {
  const [classInfo, setClassInfo] = useState<Class>();
  const { loading, error, data } = useQuery(GetClassData(props.consultantId,props.classId,props.scheduleId));

  useEffect(() => {
    !error && !loading && setClassInfo(data.consultant_profiles_link_class_profiles_link_class_schedules_by_pk)  
  }, [loading, error, data]);

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
