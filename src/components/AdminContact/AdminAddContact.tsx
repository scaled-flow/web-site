import React, { useState } from "react";

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import AdminContactForm from "./AdminContactForm";

interface Props {}

const AdminAddContact: React.FC<Props> = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      {isCollapsed ? (
        <div className="text-center">
          <Icon
            icon={faPlusSquare}
            size="4x"
            color="#365b7d"
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
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
