import React, { useState } from "react";

import { InputGroup, FormControl, Button } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import AdminContactForm from "./AdminContactForm";

interface Props {}

interface Input {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  message: string;
}

const AdminAddContact: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [formInfo, setFormInfo] = useState<Input>({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    message: ""
  });
  return (
    <>
      {isCollapsed ? (
        <Icon
          icon={faPlusSquare}
          size="4x"
          color="#365b7d"
          onClick={() => setIsCollapsed(!isCollapsed)}
        />
      ) : (
        <form>
          <AdminContactForm
            type="add"
            cb={() => setIsCollapsed(!isCollapsed)}
          />
        </form>
      )}
    </>
  );
};

export default AdminAddContact;
