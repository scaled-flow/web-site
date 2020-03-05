import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminPullTables: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>PULL TABLES</AdminHeader>
      <p>AdminPullTables</p>
    </>
  );
};

export default AdminPullTables;
