import React, { useReducer } from "react";

import { Button, Form, Row, Col } from "react-bootstrap";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";

interface Props {}

interface State {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  message: string;
}

type Action =
  | { type: "fName"; payload: string }
  | { type: "lName"; payload: string }
  | { type: "email"; payload: string }
  | { type: "phone"; payload: string }
  | { type: "message"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "fName":
      return { ...state, fName: action.payload };
    case "lName":
      return { ...state, lName: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "message":
      return { ...state, message: action.payload };
    default:
      return { ...state };
  }
};
const Contact: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    message: ""
  });

  function sendContactData(data: State) {
    fetch("https://t5oilhwxk3.execute-api.us-east-2.amazonaws.com/dev/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="contact-form">
        <Form>
          <Row>
            <Col>
              <FormInput
                title="First Name"
                cb={dispatch}
                action="fName"
                type="text"
              />
              <FormInput
                title="Last Name"
                cb={dispatch}
                action="lName"
                type="text"
              />
              <FormInput
                title="Email"
                cb={dispatch}
                action="email"
                type="email"
              />
              <FormInput
                title="Phone"
                cb={dispatch}
                action="phone"
                type="phone"
              />
              <FormTextarea
                title="Message"
                rows={3}
                action="message"
                cb={dispatch}
              />
              <Button
                className="mt-2 mb-2"
                onClick={() => {
                  console.log(state);
                  sendContactData(state);
                }}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Contact;
