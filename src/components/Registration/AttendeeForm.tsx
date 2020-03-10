import React, { useReducer, useEffect } from "react";

import { Row, Col } from "react-bootstrap";

import { Attendee } from "./RegistrationForm";

import FormInput from "../Forms/FormInput";

interface Props {
  attendeeInfo: Attendee;
  cb: any;
  action: string;
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

const AttendeeForm: React.FC<Props> = ({ attendeeInfo, cb, action }) => {
  const [state, dispatch] = useReducer(reducer, { fName: "", lName: "", email: "" });

  useEffect(() => {
    const attendee = new Attendee(attendeeInfo.i, state.fName, state.lName, state.email);
    cb({ type: "attendees", payload: attendee });
  }, [state]);
  return (
    <>
      <Row>
        <Col>
          <FormInput title="First Name" cb={dispatch} action="fName" type="text" />
        </Col>
        <Col>
          <FormInput title="Last Name" cb={dispatch} action="lName" type="text" />
        </Col>
        <Col>
          <FormInput title="Email" cb={dispatch} action="email" type="text" />
        </Col>
      </Row>
    </>
  );
};

export default AttendeeForm;
