import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  title: string;
  cb: any;
  action: string;
  type: string;
}

const AdminFormInput: React.FC<Props> = ({ title, cb, action, type }) => {
  return (
    <>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        type={type}
        aria-label={title}
        aria-describedby="basic-addon1"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          cb({ type: action, payload: e.target.value });
        }}
      ></Form.Control>
    </>
  );
};

export default AdminFormInput;
