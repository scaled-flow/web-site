import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { Button } from "react-bootstrap";

import { ConsultantProfile, ConsultantProfileLinkClassProfile } from "../../graphQL/types";
import { GET_ALL_CONSULTANTS } from "../../graphQL/queries";
import "./AdminConsultants.css";
import ConsultantItem from "./ConsultantItem";

interface Props { }

const ConsultantList: React.FC<Props> = () => {
  const [consultants, setConsultants] = useState<ConsultantProfileLinkClassProfile[]>(
    [] as ConsultantProfileLinkClassProfile[]
  );
  const [newConsultantIndex, setNewConsultantIndex] = useState(0)
  const newConsultant = () => {
    const newid = consultants.map(consultant => consultant.consultant_profile_user_id).reduce((max, id) => {
      if (id) {
        max = max === undefined || id >= max ? id + 1 : max
      }
      if (max === undefined) {
        max = 0
      }
      return max
    }, 0)
    const newConsultant: ConsultantProfileLinkClassProfile = {
      consultant_profile_user_id: newid,
      profile_photo_url: "http://www.testscaledflow.com/jitterbeast.gif"
    }
    setConsultants([...consultants, newConsultant])
  }

  // const removeConsultant = (i: number) => {
  //   setConsultants([:i],)
  // }

  const { loading, error, data } = useQuery(GET_ALL_CONSULTANTS);
  useEffect(() => {
    const temp = !loading ? data.consultant_profiles : [];
    setConsultants(temp);
    setNewConsultantIndex(temp.length)
  }, [loading, data]);

  console.log(consultants);
  return (
    <>
      {consultants.map((consultant, i) => (
        newConsultantIndex === i ? <ConsultantItem isNew key={consultant.consultant_profile_user_id} consultant={consultant} /> : <ConsultantItem key={consultant.consultant_profile_user_id} consultant={consultant} />
        
      ))}
      <Button onClick={newConsultant}>NEW</Button>
    </>
  );
};

export default ConsultantList;
