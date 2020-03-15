import React, { useReducer, useEffect } from "react";

import { Row, Col, Form } from "react-bootstrap";

import FormSelect from "../Forms/FormSelect";
import FormCheck from "../Forms/FormCheck";
import { HeroItem as State } from "./AdminHeroList";
import "./AdminHero.css";

interface Props {
  cb: any;
  item: State;
}

class Item implements State {
  constructor(public active: boolean, public hero_text: string, public id: number) {}
}

type Action = { type: "switch_active"; payload: string } | { type: "change_text"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "change_text":
      return { ...state };
    case "switch_active":
      console.log(action.payload);
      const temp = action.payload === "active" ? true : false;
      return { ...state, active: temp };
    default:
      return { ...state };
  }
};

const HeroItem: React.FC<Props> = ({ children, cb, item }) => {
  const [state, dispatch] = useReducer(reducer, { hero_text: item.hero_text, active: item.active, id: item.id });

  useEffect(() => {
    const temp = new Item(state.active, state.hero_text, state.id);
    cb({ type: "switch_active", payload: temp });
  }, [state]);

  return (
    <div className="hero-list-item">
      <Row>
        <Col className="align-self-center" md={6}>
          {children}
        </Col>
        <Col className="align-self-center" md={2}>
          {/* <FormSelect options={["active", "inactive"]} cb={dispatch} action="switch_active" /> */}
          {/* TODO: Change this to a check maybe? */}
          <Form>
            <FormCheck />
          </Form>
        </Col>
        <Col className="align-self-center" md={3}>
          <button>delete</button>
        </Col>
      </Row>
    </div>
  );
};

export default HeroItem;
