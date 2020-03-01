import React from "react";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Input } from "./AdminContactForm";

interface Props {
  title: string;
  cb: any;
  formInfo: Input;
}

const AdminFormInput: React.FC<Props> = ({ title, cb, formInfo }) => {
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            cb({ ...formInfo, fName: e.target.value })
          }
        />
        <p>{formInfo.fName}</p>
      </InputGroup>
    </>
  );
};

export default AdminFormInput;
