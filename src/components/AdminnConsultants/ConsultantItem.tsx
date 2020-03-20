import React, { useState } from "react";

import { Row, Col, Image } from "react-bootstrap";

import { ConsultantProfileLinkClassProfile } from "../../graphQL/types";

interface Props {
  consultant: ConsultantProfileLinkClassProfile;
}

const CounsultantItem: React.FC<Props> = ({ consultant }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
              {consultant.class_profile?.map(classProfile => (
                <p key={classProfile.class_profile_id}>
                  stuff
                  {/* {classProfile.class_title} - {classProfile.class_type?.class_type_abbreviation} */}
                </p>
              ))}
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
