import React, { useReducer, useEffect } from "react";

import { Row, Col, Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { Class } from "../../graphQL/types";
import { GetClassPrice } from "../../graphQL/queries";
import FormInput from "../Forms/FormInput";
import AttendeeForm from "./AttendeeForm";
import { Transaction } from "../../pages/client/ClassRegistrationPage";
import "./Registration.css";

interface Props {
  classInfo: Class | undefined;
  isOnline: "in-person" | "online";
  cb: any;
  totalPrice: number;
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
}

type Action =
  | { type: "attendees"; payload: Attendee }
  | { type: "numOfAttendees"; payload: string }
  | { type: "pricePerPerson"; payload: number }
  | { type: "totalPrice"; payload: number };

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
    case "totalPrice":
      return { ...state, totalPrice: action.payload };
    default:
      return { ...state };
  }
};

const RegistrationForm: React.FC<Props> = ({ classInfo, isOnline, cb }) => {
  const [state, dispatch] = useReducer(reducer, {
    attendees: [],
    numOfAttendees: 0,
    pricePerPerson: 0,
    totalPrice: 0
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
    dispatch({ type: "totalPrice", payload: tempPrice });
  }, [state.numOfAttendees, state.pricePerPerson]);

  useEffect(() => {
    cb({ type: "attendees", payload: state.attendees });
    cb({ type: "numOfAttendees", payload: state.numOfAttendees });
    cb({ type: "pricePerPerson", payload: state.pricePerPerson });
    cb({ type: "totalPrice", payload: state.totalPrice });
  }, [state]);

  return (
    <div className="reg-row">
      <Row>
        <Col md={10}>
          <h2 className="reg-header">Attendee Registration</h2>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <FormInput title="Number of attendees" cb={dispatch} action="numOfAttendees" type="number" placeholder="0" />
          {/* TODO: disable scroll number change */}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={2}>
          <h5>First Name</h5>
        </Col>
        <Col md={2}>
          <h5>Last Name</h5>
        </Col>
        <Col md={3}>
          <h5>Email</h5>
        </Col>
        <Col md={2}>
          <h5>Price/Person</h5>
        </Col>
        <Col md={2}>
          <h5>Total</h5>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          {state.attendees.map((attendee, i) => {
            return (
              <AttendeeForm
                key={attendee.i}
                attendeeInfo={attendee}
                prices={{ pricePerDay: state.pricePerPerson, total: state.totalPrice }}
                cb={dispatch}
                action="attendees"
                isLast={state.attendees.length === i + 1 ? true : false}
                number={i}
              />
            );
          })}
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
