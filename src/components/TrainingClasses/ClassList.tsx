import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";
import { ClassType } from "../../pages/client/TrainingPage";

import axios from "axios";

interface Props {
  classType: string;
}

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

const ENDPOINT = "https://api.testscaledflow.com/v0/classes";

const ClassList: React.FC<Props> = ({ classType }) => {
  const [classes, setClasses] = useState<Class[]>([]);

  useEffect(() => {
    if (classType === "/training/scaled-agile") {
      console.log("GET s-a ENDPOINT");
      axios.get(ENDPOINT).then(res => setClasses(res.data));
    } else if (classType === "/training/LeSS") {
      console.log("Get LeSS ENDPOINT");
      axios.get(ENDPOINT).then(res => setClasses(res.data));
    }
  }, [classType]);

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
