import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  options: string[];
  cb: any;
  action: string;
  title: string;
}

const FormSelect: React.FC<Props> = ({ options, cb, action, title }) => {
  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>{title}</Form.Label>
          <Form.Control
            as="select"
            custom
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              cb({ type: action, payload: e.target.value });
            }}
          >
            {options.map((o, i) => (
              <option key={i}>{o}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormSelect;
