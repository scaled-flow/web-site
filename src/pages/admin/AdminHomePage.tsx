import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminHeroForm from "../../components/AdminHeroForm/AdminHeroForm";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>Admin Login</AdminHeader>
      <Container>
        <Row>
          <Col>
            <AdminHeroForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Content Form</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHomePage;
