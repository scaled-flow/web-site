import React from "react";
import AddImage from "../Forms/FormAddImage"
import FormInput from "../Forms/FormInput"
import { Form } from "react-bootstrap";

interface Props {}

const ConsultantAddForm: React.FC<Props> = () => {
  return (
    <>
      <p>ConsultantAddForm</p>
      <Form>
      <AddImage />
      <FormInput title="name" cb="" action="" type="text" />
      </Form>
    </>
  );
};

export default ConsultantAddForm;
