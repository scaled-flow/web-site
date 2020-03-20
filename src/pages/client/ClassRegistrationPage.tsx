import React, { useState, useEffect } from "react";

import { Container } from "react-bootstrap";
import { GetClassData } from "../../graphQL/queries";
import { Class } from "../../graphQL/types";
import { useQuery } from "@apollo/client";

import ContentContainer from "../../components/ContentContainer/ContentContainer";
import RegistrationInfo from "../../components/Registration/RegistrationInfo";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import PurchaserInfo from "../../components/Registration/PurchaserInfo";
import "../../components/Registration/Registration.css";

interface Props {
  consultantId: number;
  classId: number;
  scheduleId: number;
  isOnline: "in-person" | "online";
}

const ClassRegistrationPage: React.FC<Props> = ({ consultantId, classId, scheduleId, isOnline }) => {
  const [classInfo, setClassInfo] = useState<Class>();
  const { loading, error, data } = useQuery(GetClassData(consultantId, classId, scheduleId));

  useEffect(() => {
    !error && !loading && setClassInfo(data.consultant_profiles_link_class_profiles_link_class_schedules_by_pk);
  }, [loading, error, data]);

  console.log(classInfo);
  return (
    <>
      <ContentContainer customColor="#EFF9FF">
        <Container>
          <RegistrationInfo classInfo={classInfo} />
          <RegistrationForm classInfo={classInfo} isOnline={isOnline} />
          <PurchaserInfo />
        </Container>
      </ContentContainer>
    </>
  );
};

export default ClassRegistrationPage;
