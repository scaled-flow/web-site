import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminContact: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>CONTACT</AdminHeader>
      <p>Admin contact Page</p>
    </>
  );
};

export default AdminContact;
