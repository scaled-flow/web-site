import React, { useState, useEffect } from "react";

import { Row, Col, Image } from "react-bootstrap";

import { ConsultantProfileLinkClassProfile } from "../../graphQL/types";
import { GET_CLASS_TYPES_BY_CONSULTANT_ID } from "../../graphQL/queries"

import { useQuery } from "@apollo/client";

interface Props {
  consultant: ConsultantProfileLinkClassProfile;
}

interface ClassType {
  class_type_abbreviation: string;
  class_type_full_name: string;
  class_type_id: number;
  class_type_tag_line: string;
}

const CounsultantItem: React.FC<Props> = ({ consultant }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const {loading, error, data} = useQuery(GET_CLASS_TYPES_BY_CONSULTANT_ID, {variables:{consultant_id: consultant.consultant_profile_user_id}})
  const [classTypes, setClassTypes] = useState([] as ClassType[])

  useEffect(()=>{
    if(!loading && !error) {
      const profilesData: {class_profile: {class_type: ClassType, class_type_id_fk: number}}[] = data.counsultant_profiles_link_class_profiles
      const returnedTypes = profilesData.map(profile => profile.class_profile.class_type)
      const uniqueTypes = returnedTypes.reduce((ts: ClassType[], classType: ClassType) => {
        const exists = ts.filter(t => t.class_type_id === classType.class_type_id).length>0
        if(!exists){
          return [...ts, classType]
        } else {
          return ts
        }
      },[] as ClassType[])
      setClassTypes(uniqueTypes)
    }
  },[loading, error, data])

  return (
    <div className="consultant-row">
      <Row>
        <Col md={11}>
          <h4>
            {consultant.first_name} {consultant.last_name}
          </h4>
          <p>
            {consultant.job_title} - {consultant.phone}
          </p>
        </Col>
        <Col md={1} className="align-self-center">
          <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <i className="fa-2x fas fa-caret-right"></i> : <i className="fa-2x fas fa-caret-down"></i>}
          </button>
        </Col>
      </Row>
      {!isCollapsed && (
        <>
          <Row>
            <Col md={3}>
              <Image
                src={consultant.profile_photo_url}
                alt={`${consultant.first_name} ${consultant.last_name}`}
                fluid
              />
            </Col>
            <Col md={7}>
              <p>{consultant.profile_description}</p>
              <h5>Is authorized to teach:</h5>
              {classTypes.map(classProfile => <p key={classProfile.class_type_full_name}>
                  {classProfile.class_type_abbreviation} - {classProfile.class_type_full_name}
                </p>
              )}
            </Col>
            <Col md={2} className="">
              <button className="no-style">
                <i className="far fa-edit fa-2x"></i>
              </button>
              <button className="no-style">
                <i className="far fa-trash-alt fa-2x"></i>
              </button>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default CounsultantItem;
