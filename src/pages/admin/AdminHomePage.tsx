import React, { useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminHeroForm from "../../components/AdminHero/AdminHeroForm";
import AdminHeroList from "../../components/AdminHero/AdminHeroList";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isHeaderSectionCollapsed, setIsHeaderSectionCollapsed] = useState<boolean>(true);
  const [isBodySectionCollapsed, setIsBodySectionCollapsed] = useState<boolean>(true);
  const [bodyBtnText, setBodyBtnText] = useState<string>("Open");

  return (
    <>
      <AdminHeader>Home Page</AdminHeader>
      <Container className="mb-5">
        <Row>
          <Col className="text-center">
            <Button
              onClick={() => {
                setIsHeaderSectionCollapsed(!isHeaderSectionCollapsed);
                setIsBodySectionCollapsed(true);
                setIsCollapsed(true);
                setBodyBtnText(bodyBtnText === "Open" ? "Close" : "Open");
              }}
              className="mb-3"
              variant={bodyBtnText === "Open" ? "success" : "danger"}
            >
              {bodyBtnText} Edit Home Page Header
            </Button>
          </Col>
        </Row>
        {!isHeaderSectionCollapsed && (
          <>
            <Row>
              <Col className="text-center">
                {isCollapsed ? (
                  <Button onClick={() => setIsCollapsed(!isCollapsed)}>Add New Header</Button>
                ) : (
                  // <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
                  //   <i className="far fa-plus-square fa-4x"></i>
                  // </button>
                  <AdminHeroForm cb={() => setIsCollapsed(!isCollapsed)} />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <AdminHeroList />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default AdminHomePage;
