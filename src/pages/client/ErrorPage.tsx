import React from "react";

import { RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { Container, Row, Col, Image } from "react-bootstrap";
import error from "../../img/error.jpg";

interface Props extends RouteComponentProps { }

const ErrorPage: React.FC<Props> = ({ ...props }: Props) => {
    return (
        <>
            <Header title="Big Mistake" />
            <ContentContainer>
                <div>
                    <Container>
                        <Row>
                            <Col md={6}>
                                <Image
                                    style={{
                                        "width": "350px"
                                    }}
                                    roundedCircle fluid src={error} />
                            </Col>
                            <Col md={6}>
                                <h1
                                    style={{
                                        "marginTop": "130px"
                                    }}
                                >Page Not Found</h1>

                            </Col>
                        </Row>
                    </Container>
                </div>
            </ContentContainer>
        </>
    );
};

export default ErrorPage;
