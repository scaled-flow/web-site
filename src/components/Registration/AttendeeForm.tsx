import React, { useReducer, useEffect } from "react";

import { Row, Col } from "react-bootstrap";

import { Attendee } from "./RegistrationForm";

import FormInput from "../Forms/FormInput";

interface Props {
  attendeeInfo: Attendee;
  cb: any;
  action: string;
  isLast: boolean;
  prices: {
    pricePerDay: number;
    total: number;
  };
  number: number;
}

interface State {
  fName: string;
  lName: string;
  email: string;
}

type Action =
  | { type: "fName"; payload: string }
  | { type: "lName"; payload: string }
  | { type: "email"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "fName":
      return { ...state, fName: action.payload };
    case "lName":
      return { ...state, lName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    default:
      return { ...state };
  }
};

const AttendeeForm: React.FC<Props> = ({ attendeeInfo, cb, action, isLast, prices, number }) => {
  const [state, dispatch] = useReducer(reducer, { fName: "", lName: "", email: "" });

  useEffect(() => {
    const attendee = new Attendee(attendeeInfo.i, state.fName, state.lName, state.email);
    cb({ type: "attendees", payload: attendee });
  }, [state]);

  return (
    <>
      <Row>
        <Col md={2}>
          <FormInput
            title="First Name"
            cb={dispatch}
            action="fName"
            type="text"
            useAria="yes"
            placeholder={number % 2 === 0 ? "John" : "Jane"}
          />
        </Col>
        <Col md={2}>
          <FormInput title="Last Name" cb={dispatch} action="lName" type="text" useAria="yes" placeholder={"Doe"} />
        </Col>
        <Col md={3}>
          <FormInput
            title="Email"
            cb={dispatch}
            action="email"
            type="email"
            useAria="yes"
            placeholder={number % 2 === 0 ? "john.doe@email.com" : "jane.doe@email.com"}
          />
        </Col>
        <Col md={2}>
          <div className="att-reg-price">${prices.pricePerDay}</div>
        </Col>
        <Col md={2}>
          {isLast && <div className="att-reg-price last">${prices.total}</div>}
          {/* <div className={`att-reg-price ${isLast && "last"}`}>${prices.pricePerDay * (number + 1)}</div> */}
        </Col>
      </Row>
    </>
  );
};

export default AttendeeForm;
