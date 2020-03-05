import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>Admin Login</AdminHeader>
      <p>Admin Home Page</p>
    </>
  );
};

export default AdminHomePage;
