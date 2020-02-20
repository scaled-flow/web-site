import * as React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
   faUsers,
   faBrain,
   faIndustry
} from "@fortawesome/free-solid-svg-icons";
import { RouteComponentProps, Link } from "react-router-dom";

import "./Pages.css";
import ContentContainer from "../components/ContentContainer/ContentContainer";

interface Props extends RouteComponentProps {}

const HomePage: React.FC<Props> = ({ ...props }: Props) => {
   return (
      <>
         <header className="header-main dark-overlay-main">
            <Container>
               <Row>
                  <Col sm={{ span: 9, offset: 3 }} className="text-center hero">
                     <h1>SAFe 5.0® is here. Get certified, get SAFe!</h1>
                     <h5>
                        SCALED FLOW ® provides onsite or offsite training and
                        coaching.
                     </h5>
                     <Link to="/" className="link-button">
                        Schedule Training
                     </Link>
                  </Col>
               </Row>
            </Container>
         </header>
         <ContentContainer>
            <Container>
               <Row>
                  <Col md={{ span: 2 }} sm={12}>
                     <Icon icon={faUsers} size="5x" color="#87cefa" />
                  </Col>
                  <Col md={10} sm={12}>
                     <h3>SAFe® Coaching</h3>
                     <p>
                        Looking busy does not help the growth of the company or
                        the individual. Being busy is often not much different
                        than looking busy in its end result. No, time to step
                        back, take a deep breath, and evaluate what activities
                        are "actually" useful or can be improved? No time to
                        chart a new direction, streamline or reinvent? Often,
                        employees just need permission to innovate and a bit of
                        initial structured guidance. Setting up a Dojo can be an
                        excellent way of setting and achieving critical goals.
                        Scaled Flow provided coaching can help!
                     </p>
                  </Col>
               </Row>
               <Row>
                  <Col md={{ span: 2 }} sm={12}>
                     <Icon icon={faBrain} size="5x" color="#87cefa" />
                  </Col>
                  <Col md={10} sm={12}>
                     <h3>SAFe® Training</h3>
                     <p>
                        Scaled Agile, as the name implies, can scale to the
                        needs of small or fortune 100 sized companies. Learn how
                        to scale for your company's needs! The first step is to
                        receive Scaled Agile training. Scaled Flow provides
                        training to fit your needs.
                     </p>
                  </Col>
               </Row>
               <Row>
                  <Col md={{ span: 2 }} sm={12}>
                     <Icon icon={faIndustry} size="5x" color="#87cefa" />
                  </Col>
                  <Col md={10} sm={12}>
                     <h3>SAFe® DevOps Assessment</h3>
                     <p>
                        Learn to identify areas of strength and weakness in your
                        process flow quickly with a DevOps Health Radiator.
                        Learn how to outline your current flow and determine the
                        improvements required to achieve the desired future
                        flow. Improve your DevOps process flow dramatically with
                        a DevOps Assessment and training.
                     </p>
                  </Col>
               </Row>
            </Container>
         </ContentContainer>
      </>
   );
};

export default HomePage;
