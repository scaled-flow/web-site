import React from "react";

interface Props {}

const AdminHeader: React.FC<Props> = ({ children }) => {
  return (
    <>
      <h1 className="admin-header">{children}</h1>
    </>
  );
};

export default AdminHeader;
