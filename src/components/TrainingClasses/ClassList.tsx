import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";

import axios from "axios";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";

interface Props {}

export interface Class {
  ConsultantId: number;
  ClassID: number;
  ConsultantProfileUserID: number;
  FirstName: string;
  LastName: string;
  JobTitle: string;
  ProfileDescription: string;
  ProfilePhotoURL: string;
  Phone: string;
  Email: string;
  ClassProfileID: number;
  ClassTypeID: number;
  ClassTypeFullName: string;
  ClassTypeAbbreviation: string;
  ClassTitle: string;
  ClassDescription: string;
  ClassImage: string;
  ClassEarlyBirdPriceReduction: number;
  ClassGroupPriceReductionPercent: number;
  ClassInPersonStandardPrice: number;
  ClassOnlineStandardPrice: number;
  ClassCurrencyTypeID: number;
  CurrencyTypeFullName: string;
  CurrencyTypeAbbreviation: string;
}

const ClassList: React.FC<Props> = () => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    console.log("HELLO");
    axios
      .get("https://api.testscaledflow.com/v0/classes")
      .then(res => setClasses(res.data));
    return () => {};
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            {classes.map(
              (c, i) => i < 20 && <ClassCard key={i} classData={c} />
            )}
          </Col>
          <Col md={3}>
            <p>Checkout box</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
