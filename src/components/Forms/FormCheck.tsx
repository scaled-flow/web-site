import React from "react";

import { Form } from "react-bootstrap";

interface Props {}

const FormCheck: React.FC<Props> = () => {
  return <Form.Check type="switch" id="custom-switch" label="Check this switch" />;
};

export default FormCheck;
