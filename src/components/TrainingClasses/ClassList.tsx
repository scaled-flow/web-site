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
  const [classesFiltered, setClassesFiltered] = useState<Class[]>([]);
  const [isFiltered, setIsFiltered] = useState(true);

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

  useEffect(() => {
    const filteredClasses = classes.filter((c, i) => i < 4);
    isFiltered
      ? setClassesFiltered(filteredClasses)
      : setClassesFiltered(classes);
  }, [isFiltered, classes]);

  return (
    <>
      <Container>
        <Row>
          <Col lg={6}>
            <h4>In Person Classes</h4>
            {classesFiltered.map((c, i) => (
              <Col md={12} className="class-card" key={i}>
                <ClassCard
                  classData={c}
                  isOnline="In-Person, Live Instructor-led Class"
                />
              </Col>
            ))}
          </Col>
          <Col lg={6}>
            <h4>Online Classes</h4>
            {classesFiltered.map((c, i) => (
              <Col md={12} className="class-card" key={i}>
                <ClassCard
                  classData={c}
                  isOnline="Online, Live Instructor-led Class"
                />
              </Col>
            ))}
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <button
              className="link-styled-button"
              onClick={() => setIsFiltered(!isFiltered)}
            >
              {isFiltered ? "See More Classes" : "See Fewer Classes"}
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
