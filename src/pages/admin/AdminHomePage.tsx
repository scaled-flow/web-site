import React, { useState } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminHeroForm from "../../components/AdminHero/AdminHeroForm";
import AdminHeroList from "../../components/AdminHero/AdminHeroList";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  return (
    <>
      <AdminHeader>Home Page</AdminHeader>
      <Container className="mb-5">
        <Row>
          <Col className="text-center">
            {isCollapsed ? (
              <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
                <i className="far fa-plus-square fa-4x"></i>
              </button>
            ) : (
              <AdminHeroForm cb={() => setIsCollapsed(!isCollapsed)} />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <AdminHeroList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHomePage;
