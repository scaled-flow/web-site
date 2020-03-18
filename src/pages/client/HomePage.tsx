import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { RouteComponentProps, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "./Pages.css";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import { GET_CURRENT_HERO_INFO, GET_MAIN_PAGE_INFO } from "../../graphQL/queries";

interface Props extends RouteComponentProps {}

interface HeaderData {
  hero_button_text?: string;
  hero_headline_text?: string;
  hero_sub_headline_text?: string;
  id?: number;
}
interface MainData {
  service_offering_body?: string;
  service_offering_font_awesome_icon?: string;
  service_offering_header?: string;
  id?: number;
}

const HomePage: React.FC<Props> = ({ ...props }: Props) => {
  const { loading: heroLoading, error: heroError, data: heroData } = useQuery(GET_CURRENT_HERO_INFO);
  const { loading: mainLoading, error: mainError, data: mainData } = useQuery(GET_MAIN_PAGE_INFO);
  const [headerData, setHeaderData] = useState<HeaderData>({});
  const [contentData, setContentData] = useState<MainData[]>([]);

  useEffect(() => {
    setHeaderData(!heroLoading && heroData.main_page_header[0]);
  }, [heroLoading, heroData]);
  useEffect(() => {
    const temp = !mainLoading ? mainData.main_page_services : [];
    console.log(temp);
    setContentData(temp);
  }, [mainLoading, mainData]);

  console.log(mainData);
  console.log(contentData);
  return (
    <>
      <header className="header-main dark-overlay-main">
        <Container>
          <Row>
            <Col sm={{ span: 9, offset: 3 }} className="text-center hero">
              <h1>{headerData.hero_headline_text}</h1>
              <h5>{headerData.hero_sub_headline_text}</h5>
              <Link to="/" className="link-button">
                {headerData.hero_button_text}
              </Link>
            </Col>
          </Row>
        </Container>
      </header>
      <ContentContainer>
        <Container>
          {contentData.map(data => (
            <Row key={data.id}>
              <Col md={{ span: 2 }} sm={12}>
                <i className={`${data.service_offering_font_awesome_icon} fa-5x icon`}></i>
              </Col>
              <Col md={10} sm={12}>
                <h3>{data.service_offering_header}</h3>
                <p>{data.service_offering_body}</p>
              </Col>
            </Row>
          ))}
        </Container>
      </ContentContainer>
    </>
  );
};

export default HomePage;
