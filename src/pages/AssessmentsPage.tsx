import React from "react";

import { RouteComponentProps } from "react-router-dom";
import Header from "../components/Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import ContentContainer from "../components/ContentContainer/ContentContainer";
import RegisterForm from "../components/RegisterForm/RegisterForm";

interface Props extends RouteComponentProps {}

const AssessmentsPage: React.FC<Props> = ({ ...props }: Props) => {
   return (
      <>
         <Header title="Assessments" />
         <ContentContainer>
            <Container>
               <Row>
                  <Col lg={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
                     <Row className="row-style">
                        <Col>
                           <h1>
                              Optimize your <strong>Value Stream</strong> with{" "}
                              <strong>SAFe® DevOps</strong>
                           </h1>
                        </Col>
                     </Row>
                     <Row className="row-style">
                        <Col sm={2} className="text-center">
                           <Icon
                              icon={faCheckSquare}
                              size="3x"
                              color="#365b7d"
                           />
                        </Col>
                        <Col sm={10}>
                           An excellent place to start the optimization of your
                           Value Stream is with a SAFe® DevOps health
                           assessment. The first step in improving your DevOps
                           practice is to identify its current state.
                        </Col>
                     </Row>
                     <Row className="row-style">
                        <Col sm={2} className="text-center">
                           <Icon
                              icon={faCheckSquare}
                              size="3x"
                              color="#365b7d"
                           />
                        </Col>
                        <Col sm={10}>
                           During the health assessment, you will learn to map
                           your current pipeline using key metrics and create a
                           future state solution hypotheses through
                           collaboration and research of customer needs.
                           Creation of a Vision, Roadmap, and Program Backlog
                           are also covered.
                        </Col>
                     </Row>
                     <Row className="row-style">
                        <Col sm={2} className="text-center">
                           <Icon
                              icon={faCheckSquare}
                              size="3x"
                              color="#365b7d"
                           />
                        </Col>
                        <Col sm={10}>
                           The final step of the health assessment is learning
                           to build quality into your newly created Continuous
                           Delivery Pipeline. Automation of the pipeline
                           includes Continuous Exploration, Continuous
                           Integration, Continuous Deployment, and Release on
                           Demand steps.
                        </Col>
                     </Row>
                  </Col>
                  <Col
                     lg={{ span: 4, order: 2 }}
                     xs={{ span: 12, order: 1 }}
                     className="learn-more-box text-center"
                  >
                     <h3>Learn more</h3>
                     <p>Please fill out this form to register</p>
                     <RegisterForm />
                  </Col>
               </Row>
            </Container>
         </ContentContainer>
      </>
   );
};

export default AssessmentsPage;
