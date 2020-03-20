import React, { useReducer, useEffect } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { Class } from "../../graphQL/types";
import { GetClassPrice } from "../../graphQL/queries";
import FormInput from "../Forms/FormInput";
import AttendeeForm from "./AttendeeForm";
import "./Registration.css";

interface Props {
  classInfo: Class | undefined;
  isOnline: "in-person" | "online";
}

export class Attendee {
  constructor(public i: number, public fName: string, public lName: string, public email: string) {}
}

// interface State and type Action are for the reducer
interface State {
  attendees: Attendee[];
  numOfAttendees: number;
  pricePerPerson: number;
  totalPrice: number;
  numOfDays: number;
}

type Action =
  | { type: "attendees"; payload: Attendee }
  | { type: "numOfAttendees"; payload: string }
  | { type: "pricePerPerson"; payload: number }
  | { type: "totalPrice"; payload: number }
  | { type: "numOfDays"; payload: number };

// This controlls the input
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // this case comes from the cb in AttendeeForm
    case "attendees":
      // action.payload.i is the index generated from numOfAttendees case
      const index = action.payload.i;
      // holds all of the attendees temp
      let tempArr: Attendee[] = state.attendees;
      // replace just the one you need with the rest of the info from action.payoload
      tempArr[index] = action.payload;
      return { ...state, attendees: tempArr };
    case "numOfAttendees":
      // protect from negative numbers
      if (parseInt(action.payload) < 0) {
        return { ...state, numOfAttendees: 0 };
      }

      const newNumber = parseInt(action.payload);
      let temp: Attendee[] = [];
      for (let i = 0; i < newNumber; i++) {
        // add a new Attendee to temp arr
        temp.push(new Attendee(i, "", "", ""));
      }
      return { ...state, numOfAttendees: newNumber, attendees: temp };
    case "pricePerPerson":
      // standard replacement from here
      return { ...state, pricePerPerson: action.payload };
    case "numOfDays":
      return { ...state, numOfDays: action.payload };
    case "totalPrice":
      return { ...state, totalPrice: action.payload };
    default:
      return { ...state };
  }
};

const RegistrationForm: React.FC<Props> = ({ classInfo, isOnline }) => {
  const [state, dispatch] = useReducer(reducer, {
    attendees: [],
    numOfAttendees: 0,
    pricePerPerson: 0,
    totalPrice: 0,
    numOfDays: 0
  });

  const history = useHistory();
  useEffect(() => {
    if (isOnline === "in-person") {
      dispatch({
        type: "pricePerPerson",
        payload: classInfo !== undefined ? classInfo!.class_profile!.class_in_person_standard_price! : 0
      });
    } else if (isOnline === "online") {
      dispatch({
        type: "pricePerPerson",
        payload: classInfo !== undefined ? classInfo!.class_profile!.class_online_standard_price! : 0
      });
    } else {
      history.replace("/"); // FIXME: 404?
    }
  }, [classInfo, isOnline]);

  useEffect(() => {
    const tempPrice = state.pricePerPerson * state.numOfAttendees;
    console.log(tempPrice);
    dispatch({ type: "totalPrice", payload: tempPrice });
  }, [state.numOfAttendees, state.pricePerPerson]);

  console.log(state);
  return (
    <div className="reg-row">
      <Row>
        <Col md={10}>
          <h2 className="reg-header">Attendee Registration</h2>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          <FormInput title="Number of attendees" cb={dispatch} action="numOfAttendees" type="number" placeholder="0" />
          {/* TODO: disable scroll number change */}
        </Col>
        <Col md={3}>
          <p>Price per Person - ${state.pricePerPerson}</p>
        </Col>
        <Col md={3}>
          <p>Total Price - ${state.totalPrice}</p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          {state.attendees.map(attendee => (
            <AttendeeForm key={attendee.i} attendeeInfo={attendee} cb={dispatch} action="attendees" />
          ))}
        </Col>
      </Row>
      {/* <Row>
        <Col>
          <button className="submit-btn" onClick={() => console.log(state)}>
            Submit
          </button>
        </Col>
      </Row> */}
    </div>
  );
};

export default RegistrationForm;
