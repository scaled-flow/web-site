import React, { useReducer, useEffect, useState } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPDATE_ACTIVE_HEADER } from "../../graphQL/mutations";

import HeroEditModal from "./HeroEditModal";
import HeroDeleteModal from "./HeroDeleteModal";
import { HeroItem as State } from "./AdminHeroList";
import "./AdminHero.css";

interface Props {
  cb: any;
  item: State;
}

class Item implements State {
  constructor(
    public active?: boolean,
    public hero_headline_text?: string,
    public hero_sub_headline_text?: string,
    public hero_button_text?: string,
    public hero_button_pointer?: string,
    public id?: number
  ) {}
}

type Action = { type: "switch_active"; payload: boolean } | { type: "change_text"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "change_text":
      return { ...state };
    case "switch_active":
      return { ...state, active: action.payload };
    default:
      return { ...state };
  }
};

const HeroItem: React.FC<Props> = ({ cb, item }) => {
  const [state, dispatch] = useReducer(reducer, {});
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isEditModalShown, setIsEditModalShown] = useState<boolean>(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState<boolean>(false);
  const [activeButtonText, setActiveButtonText] = useState<string>("");

  useEffect(() => {
    setActiveButtonText(item.active ? "Active Header" : "Set as Active Header");
  }, [state]);

  const [updateActiveHeader] = useMutation(UPDATE_ACTIVE_HEADER);

  useEffect(() => {
    const temp = new Item(
      state.active,
      state.hero_headline_text,
      state.hero_sub_headline_text,
      state.hero_button_text,
      state.hero_button_pointer,
      state.id
    );
    cb({ type: "switch_active", payload: temp });
  }, [state]);

  // console.log(state.hero_text, state.active);
  return (
    <>
      <div className="hero-list-item">
        <Row>
          <Col className="align-self-center" md={8}>
            <h3>{item.hero_headline_text}</h3>
          </Col>
          <Col className="align-self-center" md={3}>
            <Button
              className={item.active ? "btn-success" : "btn-warning"}
              onClick={async () => {
                if (!item.active) {
                  setActiveButtonText("Setting as active...");
                  await updateActiveHeader({ variables: { id: item.id } });
                  window.location.reload();
                } else {
                  setActiveButtonText("This one is already active");
                  setTimeout(() => setActiveButtonText("Active Header"), 2000);
                }
              }}
            >
              {activeButtonText}
            </Button>
            {/* <p>{item.active ? "active" : "inactive"}</p> */}
          </Col>
          <Col className="align-self-center" md={1}>
            <button className="no-style" onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <i className="fas fa-caret-right fa-2x"></i> : <i className="fas fa-caret-down fa-2x"></i>}
            </button>
          </Col>
        </Row>
        {!isCollapsed && (
          <>
            <Row>
              <Col>
                <h4>{item.hero_sub_headline_text}</h4>
                <p>
                  <Button>{item.hero_button_text}</Button> links to:{" "}
                  <span className="link-style">{item.hero_button_pointer || "'no link'"}</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={{ span: 1, offset: 10 }}>
                <button className="no-style" onClick={() => setIsEditModalShown(!isEditModalShown)}>
                  <i className="far fa-edit fa-2x"></i>
                </button>
              </Col>
              <Col md={1}>
                <button
                  className="no-style"
                  onClick={() => {
                    setIsDeleteModalShown(!isDeleteModalShown);
                  }}
                >
                  <i className="far fa-trash-alt fa-2x"></i>
                </button>
              </Col>
            </Row>
          </>
        )}
      </div>
      <HeroEditModal show={isEditModalShown} cb={() => setIsEditModalShown(!isEditModalShown)} item={item} />
      <HeroDeleteModal show={isDeleteModalShown} cb={() => setIsDeleteModalShown(!isDeleteModalShown)} item={item} />
    </>
  );
};

export default HeroItem;
