import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminRegistration: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>REGISTRATION</AdminHeader>
      <p>AdminRegistration</p>
    </>
  );
};

export default AdminRegistration;
