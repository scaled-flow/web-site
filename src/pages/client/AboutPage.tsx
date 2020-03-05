import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { Container, Row, Col, Image } from "react-bootstrap";
import network from "../../img/network.jpg";

interface Props extends RouteComponentProps {}

const AboutPage: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      <Header title="About" />
      <ContentContainer>
        <div>
          <Container>
            <Row>
              <Col md={8}>
                <h1>Why SAFe - Scaled Agile Framework?</h1>
                <p>
                  Dependencies on <strong>siloed departments</strong>,
                  misaligned budgets, legacy systems communicating with a myriad
                  of departmental operations. <strong>Agile teams</strong> in a
                  sea of <strong>Waterfall</strong> or misaligned Agile teams
                  with proprietary tools, methods, and cadence. Sound familiar?
                </p>
                <p>
                  Several years ago, I started to look for an Agile Framework
                  that would introduce cadence, break down silos, work at scale,
                  and make work a bit more fun. I wanted to spend my time on an
                  evolving framework that was more than a fad. The{" "}
                  <strong>Scaled Agile Framework</strong> is what I decided to
                  invest my time learning. I am happy to see that many of the
                  leading <strong>AMLs are integrating SAFe</strong> into their
                  applications. The market place has spoken!
                </p>
                <p>
                  I have worked as a Software Developer, Software Development
                  Team Lead, Project Manager, Software Tester, and Scrum Master,
                  I've also seen the anti-patterns common to many organizations
                  from many perspectives. With numerous SAFe certifications and
                  insights, I am eager to help with your{" "}
                  <strong>SAFe Journey!</strong>
                </p>
              </Col>
              <Col md={4}>
                <Image roundedCircle fluid src={network} />
              </Col>
            </Row>
          </Container>
        </div>
      </ContentContainer>
    </>
  );
};

export default AboutPage;
