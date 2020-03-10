import React, { useReducer } from "react";

import { Row, Col, Button } from "react-bootstrap";

import FormInput from "../Forms/FormInput";
import AttendeeForm from "./AttendeeForm";

interface Props {}

export class Attendee {
  constructor(public i: number, public fName: string, public lName: string, public email: string) {}
}

interface State {
  attendees: Attendee[];
  numOfAttendees: number;
}

type Action = { type: "attendees"; payload: Attendee } | { type: "numOfAttendees"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "attendees":
      const index = action.payload.i;
      let tempArr: Attendee[] = state.attendees;
      tempArr[index] = action.payload;
      return { ...state, attendees: tempArr };
    case "numOfAttendees":
      if (parseInt(action.payload) < 0) {
        return { ...state, numOfAttendees: 0 };
      }
      const newNumber = parseInt(action.payload);
      let temp: Attendee[] = [];
      for (let i = 0; i < newNumber; i++) {
        temp.push(new Attendee(i, "", "", ""));
      }
      return { ...state, numOfAttendees: newNumber, attendees: temp };
    default:
      return { ...state };
  }
};

const RegistrationForm: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, { attendees: [], numOfAttendees: 0 });
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
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          {state.attendees.map(attendee => (
            <AttendeeForm key={attendee.i} attendeeInfo={attendee} cb={dispatch} action="attendees" />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => console.log(state)}>Submit</Button>
        </Col>
      </Row>
    </>
  );
};

export default RegistrationForm;
