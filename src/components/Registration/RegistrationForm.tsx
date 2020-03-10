import React, { useReducer } from "react";

import { Row, Col, Button } from "react-bootstrap";

import FormInput from "../Forms/FormInput";

interface Props {}

interface Attendee {
  fName: string;
  lName: string;
  email: string;
}

interface State {
  attendees: Attendee[];
  numOfAttendees: number;
  numberTracker: number[];
}

type Action =
  | { type: "attendees"; payload: string }
  | { type: "numOfAttendees"; payload: string }
  | { type: "numberTracker"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "attendees":
      return { ...state };
    case "numOfAttendees":
      const newNumber = parseInt(action.payload);
      state.numberTracker = [];
      for (let i = 0; i < newNumber; i++) {
        state.numberTracker.push(i);
      }
      return { ...state, numOfAttendees: newNumber };
    case "numberTracker":
      return { ...state };
    default:
      return { ...state };
  }
};

const RegistrationForm: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, { attendees: [], numOfAttendees: 0, numberTracker: [] });

  console.log(state);
  return (
    <>
      <Row>
        <Col md={10}>
          <h2>Attendee Registration</h2>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormInput title="Number of attendees" cb={dispatch} action="numOfAttendees" type="number" placeholder="0" />
          <p>{state.numOfAttendees}</p>

          {state.numberTracker.map(n => (
            <p>input</p>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default RegistrationForm;
