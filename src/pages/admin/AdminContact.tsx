import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminContactCard from "../../components/AdminContact/AdminContactCard";
import AdminAddContact from "../../components/AdminContact/AdminAddContact";

interface Props extends RouteComponentProps {}

const AdminContact: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>CONTACT</AdminHeader>
      <Container>
        <Row>
          <Col sm={{ span: 8, offset: 2 }} className="text-center">
            <AdminAddContact />
          </Col>
        </Row>
        {/* map from api */}
        <Row>
          <Col sm={{ span: 8, offset: 2 }}>
            <AdminContactCard contactName="Eric Smith" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminContact;
