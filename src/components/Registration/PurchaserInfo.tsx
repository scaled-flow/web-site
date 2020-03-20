import React, { useReducer } from "react";

import { Row, Col } from "react-bootstrap";

import { PurchaserInfo, Class } from "../../graphQL/types";
import "./Registration.css";
import FormInput from "../Forms/FormInput";

interface Props {
  classInfo: Class;
}

type Action =
  | { type: "fName"; payload: string }
  | { type: "lName"; payload: string }
  | { type: "company"; payload?: string }
  | { type: "address1"; payload: string }
  | { type: "address2"; payload?: string }
  | { type: "city"; payload: string }
  | { type: "state"; payload: string }
  | { type: "postal"; payload: string }
  | { type: "country"; payload: string }
  | { type: "email"; payload: string }
  | { type: "referredBy"; payload?: string };

const reducer = (state: PurchaserInfo, action: Action) => {
  switch (action.type) {
    case "fName":
      return { ...state, first_name: action.payload };
    case "lName":
      return { ...state, last_name: action.payload };
    case "company":
      return { ...state, company: action.payload };
    case "address1":
      return { ...state, address_1: action.payload };
    case "address2":
      return { ...state, address_2: action.payload };
    case "city":
      return { ...state, city: action.payload };
    case "state":
      return { ...state, state: action.payload };
    case "postal":
      return { ...state, postal_code: action.payload };
    case "country":
      return { ...state, country: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "referredBy":
      return { ...state, referredBy: action.payload };
    default:
      return { ...state };
  }
};

const PurchaserInfoForm: React.FC<Props> = ({ classInfo }) => {
  const [state, dispatch] = useReducer(reducer, {} as PurchaserInfo);

  return (
    <div className="reg-row">
      <Row>
        <Col>
          <h2 className="reg-header">Purchaser Information</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormInput title="First Name*" cb={dispatch} action="fName" type="text" />
          <FormInput title="Last Name*" cb={dispatch} action="lName" type="text" />
          <FormInput title="Company" cb={dispatch} action="company" type="text" />
          <FormInput title="Address 1*" cb={dispatch} action="address1" type="text" />
          <FormInput title="Address 2" cb={dispatch} action="address2" type="text" />
          <FormInput title="City*" cb={dispatch} action="city" type="text" />
          <FormInput title="State/Reigon*" cb={dispatch} action="state" type="text" />
          <FormInput title="Postal Code*" cb={dispatch} action="postal" type="text" />
          <FormInput title="Country*" cb={dispatch} action="country" type="text" />
          <FormInput title="Email*" cb={dispatch} action="email" type="text" />
          <FormInput title="How did you hear about us?*" cb={dispatch} action="referredBy" type="text" />
        </Col>
      </Row>
    </div>
  );
};

export default PurchaserInfoForm;
