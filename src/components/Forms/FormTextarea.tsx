import React from "react";

import { Form } from "react-bootstrap";
interface Props {
  title: string;
  rows: number;
  cb: any;
  action: string;
}

const FormTextarea: React.FC<Props> = ({ title, rows, cb, action }) => {
  return (
    <>
      <Form.Label>{title}</Form.Label>
      <Form.Control
        as="textarea"
        rows={`${rows}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          cb({ type: action, payload: e.target.value })
        }
      />
    </>
  );
};

export default FormTextarea;
