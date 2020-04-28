import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Header from "../../components/Header/Header";
import Contact from "../../components/ContactForm/Contact";

interface Props extends RouteComponentProps {}

const ContactPage: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      <Header title="Contact Us" />
      <ContentContainer>
        <Container>
          <Row>
            <Col className="text-center">
              <h2 style={{ marginBottom: 20 }}>Let me know how I can help with your training or coaching needs.</h2>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, order: 1 }} sm={{ span: 12, order: 1 }} className="contact-info-box">
              <h3>Get In Touch</h3>
              <p>For training or Coaching.</p>
              <h3>Email</h3>
              <p>JohnLeintz@ScaledFlow.com</p>
              <h3>Phone</h3>
              <p>(651) 358-1072</p>
            </Col>
            <Col md={{ span: 8, order: 2 }} sm={{ span: 12, order: 2 }}>
              <Contact />
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </>
  );
};

export default ContactPage;
