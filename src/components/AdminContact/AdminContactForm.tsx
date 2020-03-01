import React, { useReducer, Reducer } from "react";
import AdminFormInput from "./AdminFormInput";

import { InputGroup, FormControl, Button } from "react-bootstrap";

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
      <AdminFormInput title="First Name" cb={dispatch} action="fName" />
      <AdminFormInput title="Last Name" cb={dispatch} action="lName" />
      <AdminFormInput title="Email" cb={dispatch} action="email" />
      <AdminFormInput title="Phone" cb={dispatch} action="phone" />
      <Button onClick={() => console.log(state)}>Submit</Button>
    </>
  );
};

export default AdminContactForm;
