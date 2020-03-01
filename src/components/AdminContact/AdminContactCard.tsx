import React, { useState } from "react";

import { Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import "./AdminContact.css";
import AdminContactForm from "./AdminContactForm";

interface Props {
  contactName: string;
}

const AdminContactCard: React.FC<Props> = ({ contactName }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="contact-card">
      <Row>
        <Col>
          <h3>{contactName}</h3>
        </Col>
        <Col>
          <Icon
            icon={isCollapsed ? faCaretRight : faCaretDown}
            color="#365b7d"
            size="2x"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="float-right mr-4"
          />
        </Col>
      </Row>
      {!isCollapsed && (
        <AdminContactForm
          type="update"
          cb={() => setIsCollapsed(!isCollapsed)}
        />
      )}
    </div>
  );
};

export default AdminContactCard;
