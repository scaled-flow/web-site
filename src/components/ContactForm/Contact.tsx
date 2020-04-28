import React, { useReducer } from "react";

import { Button, Form, Row, Col } from "react-bootstrap";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";

//@ts-ignore
import analytics from "analytics"

interface Props { }

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

  //check local storage for cookie preferences
  let preference = JSON.parse(localStorage.getItem("cookies") || "{}")

  function sendContactData(data: State) {
    if (preference === true) {
      //@ts-ignore
      window.analytics.track('Scaled Flow Segment test', {
        plan: data.email
      });
      //@ts-ignore
      window.analytics.identify({
        contactStatus: 'contacted',
        email: data.email
      });
    }
    if (preference === false) {
    }
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
      <div className="contact-info-box">
        <Form>
          <Row>
            <Col>
              <h3 style={{ textAlign: "center" }}>Please fill out this form to contact us</h3>
              <hr />
              <Row>
                <Col>
                  <FormInput
                    placeholder="First Name"
                    cb={dispatch}
                    action="fName"
                    type="text"
                  />
                  <FormInput
                    placeholder="Last Name"
                    cb={dispatch}
                    action="lName"
                    type="text"
                  />
                </Col>
                <Col>
                  <FormInput
                    placeholder="Email"
                    cb={dispatch}
                    action="email"
                    type="email"
                  />
                  <FormInput
                    placeholder="Phone"
                    cb={dispatch}
                    action="phone"
                    type="phone"
                  />
                </Col>
              </Row>
              <Row>
                <Col style={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <FormTextarea
                    placeholder="Message"
                    rows={2}
                    action="message"
                    cb={dispatch}
                  />
                  <Button
                    style={{width: "100%", marginTop: "20px"}}
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default Contact;
