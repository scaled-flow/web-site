import React from "react";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

interface Props {
  title: string;
  cb: any;
  action: string;
}

const AdminFormInput: React.FC<Props> = ({ title, cb, action }) => {
  return (
    <>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">{title}</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          placeholder={title}
          aria-label={title}
          aria-describedby="basic-addon1"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            cb({ type: action, payload: e.target.value });
          }}
        />
      </InputGroup>
    </>
  );
};

export default AdminFormInput;
