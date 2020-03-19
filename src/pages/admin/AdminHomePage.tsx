import React, { useState, useEffect, useReducer } from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminHeroForm from "../../components/AdminHero/AdminHeroForm";
import AdminHeroList from "../../components/AdminHero/AdminHeroList";

import { GET_CURRENT_HERO_INFO, GET_MAIN_PAGE_INFO } from "../../graphQL/queries";
import { MainPageHeader, MainPageContent } from "../../graphQL/types";

interface Props extends RouteComponentProps {}

interface State {
  isAddHeroCollapsed: boolean;
  isHeaderSectionCollapsed: boolean;
  headerBtnText: string;
  isBodySectionCollapsed: boolean;
  bodyBtnText: string;
}

type Action = { type: "toggle_header_section" } | { type: "toggle_body_section" } | { type: "toggle_add_new_header" };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "toggle_header_section":
      return {
        ...state,
        isHeaderSectionCollapsed: !state.isHeaderSectionCollapsed,
        isBodySectionCollapsed: true,
        isAddHeroCollapsed: true,
        headerBtnText: "Close",
        bodyBtnText: "Open"
      };
    case "toggle_body_section":
      return {
        ...state,
        isBodySectionCollapsed: !state.isBodySectionCollapsed,
        isHeaderSectionCollapsed: true,
        isAddHeroCollapsed: true,
        bodyBtnText: "Open",
        headerBtnTest: "Close"
      };
    case "toggle_add_new_header":
      return { ...state, isAddHeroCollapsed: !state.isAddHeroCollapsed };
    default:
      return { ...state };
  }
};

const AdminHomePage: React.FC<Props> = () => {
  const { loading: heroLoading, error: heroError, data: heroData } = useQuery(GET_CURRENT_HERO_INFO);
  const { loading: mainLoading, error: mainError, data: mainData } = useQuery(GET_MAIN_PAGE_INFO);

  const [currentHeader, setCurrentHeader] = useState<MainPageHeader>({} as MainPageHeader);
  const [currentContent, setCurrentContent] = useState<MainPageContent[]>([] as MainPageContent[]);

  useEffect(() => {
    setCurrentHeader(!heroLoading && heroData.main_page_header[0]);
    setCurrentContent(!mainLoading ? mainData.main_page_services : []);
  }, [heroLoading, heroData, mainLoading, mainData]);

  console.log(currentContent);
  const [state, dispatch] = useReducer(reducer, {
    isAddHeroCollapsed: true,
    isHeaderSectionCollapsed: true,
    headerBtnText: "Open",
    isBodySectionCollapsed: true,
    bodyBtnText: "Open"
  } as State);

  return (
    <>
      <AdminHeader>Home Page</AdminHeader>
      <Container className="mb-5">
        <Row>
          <Col className="text-center">
            {/* ============== HEADER BUTTON ============== */}
            <Button
              onClick={() => {
                dispatch({ type: "toggle_header_section" });
              }}
              className="mb-3 mr-2"
              variant={state.isHeaderSectionCollapsed ? "success" : "danger"} // change header btn color
            >
              {state.headerBtnText} Edit Home Page Header
            </Button>
            {/* ============== MAIN CONTENT BUTTON ============== */}
            <Button
              onClick={() => {
                dispatch({ type: "toggle_body_section" });
              }}
              className="mb-3 ml-2"
              variant={state.isBodySectionCollapsed ? "success" : "danger"}
            >
              {state.bodyBtnText} Edit Home Page Body
            </Button>
          </Col>
        </Row>
        {!state.isHeaderSectionCollapsed && (
          <>
            <Row>
              <Col className="text-center">
                {state.isAddHeroCollapsed ? (
                  <Button
                    onClick={() => {
                      dispatch({ type: "toggle_add_new_header" });
                    }}
                  >
                    Add New Header
                  </Button>
                ) : (
                  <AdminHeroForm
                    cb={() => {
                      dispatch({ type: "toggle_add_new_header" });
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                <AdminHeroList />
              </Col>
            </Row>
          </>
        )}
        {state.isBodySectionCollapsed && state.isHeaderSectionCollapsed && (
          <Row>
            <Col sm={{ span: 6 }} className="text-center hero">
              <h1>Current Header</h1>
              <hr />
              <h2>{currentHeader.hero_headline_text}</h2>
              <h6>{currentHeader.hero_sub_headline_text}</h6>
              <Link
                to={currentHeader.hero_button_pointer ? currentHeader.hero_button_pointer : "/"}
                className="link-button"
              >
                {currentHeader.hero_button_text}
              </Link>
            </Col>
            <Col sm={6}>
              {!mainLoading &&
                currentContent.map(section => (
                  <div key={section.id}>
                    <i className={`fa-2x ${section.service_offering_font_awesome_icon}`}></i>
                    <h3>{section.service_offering_header}</h3>
                    <p>{section.service_offering_body}</p>
                    <hr />
                  </div>
                ))}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

export default AdminHomePage;
