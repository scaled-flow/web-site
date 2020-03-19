import React, { useState } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPDATE_ACTIVE_CONTENT_ITEMS } from "../../graphQL/mutations";
import { MainPageContent } from "../../graphQL/types";

import "./AdminMainContent.css";

interface Props {
  item: MainPageContent;
}

const ContentItem: React.FC<Props> = ({ item }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const [updateActiveContent] = useMutation(UPDATE_ACTIVE_CONTENT_ITEMS);

  return (
    <>
      <Row>
        <Col className="content-item">
          <Row>
            <Col md={9} className="align-self-center">
              <h4>{item.service_offering_header}</h4>
            </Col>
            <Col md={2} className="align-self-center">
              <Button
                variant={item.active ? "success" : "warning"}
                onClick={async () => {
                  await updateActiveContent({ variables: { id: item.id, active: !item.active } });
                  window.location.reload();
                }}
              >
                {item.active ? "Active" : "Inactive"}
              </Button>
            </Col>
            <Col md={1} className="align-self-center">
              <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
                <i className={`fa-2x ${isCollapsed ? "fas fa-caret-right" : "fas fa-caret-down"}`}></i>
              </button>
            </Col>
          </Row>
          {!isCollapsed && (
            <Row>
              <Col md={9}>
                <i className={`fa-2x ${item.service_offering_font_awesome_icon}`}></i>
                <p>{item.service_offering_body}</p>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ContentItem;
