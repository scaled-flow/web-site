import React, { useReducer } from "react";
import AdminFormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";

import { Form, Button } from "react-bootstrap";

interface Props {
  type: "add" | "update";
  cb?: any;
}

export interface State {
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

const AdminContactForm: React.FC<Props> = ({ type, cb }) => {
  const [state, dispatch] = useReducer(reducer, {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    message: ""
  });

  return (
    <>
      <AdminFormInput
        title="First Name"
        cb={dispatch}
        action="fName"
        type="text"
      />
      <AdminFormInput
        title="Last Name"
        cb={dispatch}
        action="lName"
        type="text"
      />
      <AdminFormInput title="Email" cb={dispatch} action="email" type="email" />
      <AdminFormInput title="Phone" cb={dispatch} action="phone" type="phone" />
      <FormTextarea title="Message" rows={3} action="message" cb={dispatch} />
      <Button
        className="mt-2 mb-2"
        onClick={() => {
          cb();
          console.log(state);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default AdminContactForm;
