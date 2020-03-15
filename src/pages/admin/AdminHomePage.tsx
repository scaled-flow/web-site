import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminHeroForm from "../../components/AdminHero/AdminHeroForm";
import AdminHeroList from "../../components/AdminHero/AdminHeroList";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>Home Page</AdminHeader>
      <Container>
        <Row>
          <Col>
            <AdminHeroForm />
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
