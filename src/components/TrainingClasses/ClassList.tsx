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
      // TODO: get correct endpoint, filter by in person/online
      axios.get(ENDPOINT).then(res => setClasses(res.data));
    } else if (classType === "/training/LeSS") {
      // TODO: get correct endpoint, filter by in person/online
      console.log("Get LeSS ENDPOINT");
      axios.get(ENDPOINT).then(res => setClasses(res.data));
    }
  }, [classType]);

  return (
    <>
      <Container>
        <Row>
          <Col md={6}>
            <h4>In Person Classes</h4>
            {classes.map((c, i) => (
              <Col md={12}>
                <ClassCard key={i} classData={c} />
              </Col>
            ))}
          </Col>
          <Col md={6}>
            <h4>Online Classes</h4>
            {classes.map((c, i) => (
              <Col md={12}>
                <ClassCard key={i} classData={c} />
              </Col>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
