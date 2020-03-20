import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { Row, Col } from "react-bootstrap";

import { ConsultantProfile, ConsultantProfileLinkClassProfile } from "../../graphQL/types";
import { GET_ALL_CONSULTANTS } from "../../graphQL/queries";
import "./AdminConsultants.css";
import ConsultantItem from "./ConsultantItem";

interface Props {}

const ConsultantList: React.FC<Props> = () => {
  const [consultants, setConsultants] = useState<ConsultantProfileLinkClassProfile[]>(
    [] as ConsultantProfileLinkClassProfile[]
  );
  const { loading, error, data } = useQuery(GET_ALL_CONSULTANTS);
  useEffect(() => {
    const temp = !loading ? data.consultant_profiles : [];
    setConsultants(temp);
  }, [loading, data]);

  console.log(consultants);
  return (
    <>
      {consultants.map(consultant => (
        <ConsultantItem key={consultant.consultant_profile_user_id} consultant={consultant} />
      ))}
    </>
  );
};

export default ConsultantList;
