import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import ConsultantAddForm from "../../components/AdminnConsultants/ConsultantAddForm";
import ConsultantList from "../../components/AdminnConsultants/ConsultantList";

interface Props extends RouteComponentProps {}

const AdminProfiles: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>CONSULTANTS</AdminHeader>
      <Container>
        <Row>
          <Col>
            <ConsultantAddForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <ConsultantList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminProfiles;
