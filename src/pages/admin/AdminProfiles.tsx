import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminProfiles: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>PROFILES</AdminHeader>
      <p>AdminProfiles</p>
    </>
  );
};

export default AdminProfiles;
