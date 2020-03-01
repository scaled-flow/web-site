import React, { useState } from "react";
import AdminFormInput from "./AdminFormInput";

import { InputGroup, FormControl, Button } from "react-bootstrap";

interface Props {
  type: "add" | "update";
  cb?: any;
}
export interface Input {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  message: string;
}

const AdminContactForm: React.FC<Props> = ({ type, cb }) => {
  const [formInfo, setFormInfo] = useState<Input>({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    message: ""
  });

  return (
    <>
      <AdminFormInput title="First Name" cb={setFormInfo} formInfo={formInfo} />
      <Button onClick={() => cb()}>Submit</Button>
    </>
  );
};

export default AdminContactForm;
