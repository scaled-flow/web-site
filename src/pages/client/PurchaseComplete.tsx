import React, { useState, useEffect } from "react";

import { RouteComponentProps, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import moment from "moment";

import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { Transaction } from "./ClassRegistrationPage";
import { Class } from "../../graphQL/types";

interface Props extends RouteComponentProps {}

interface TransactionInfo {
  transaction: Transaction;
  classInfo: Class;
}

const PurchaseComplete: React.FC<Props> = ({ history }) => {
  const [info, setInfo] = useState<any>({} as TransactionInfo);

  useEffect(() => {
    setInfo(history.location.state);
  }, [history]);
  console.log(info);
  return (
    <>
      <Header title="Thank You For Your Purchase" />
      <ContentContainer>
        <Container>
          <Row>
            <Col>
              <h1>Welcome to Scaled Flow!</h1>
              {info.classInfo !== undefined && (
                <>
                  <h2>Congratulations on signing up for {info.classInfo.class_profile.class_title}</h2>
                  <p className="h5">
                    You will receive an email confirmation soon. We look forward to working with you!
                  </p>
                  <p className="h6">
                    Why not <Link to="/"> check out our Blog</Link> in the mean time?
                  </p>
                  <p className="h6">
                    Thank you for your purchase, <br />- The Scaled Flow Team
                  </p>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </>
  );
};

export default PurchaseComplete;
