import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminPayments: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>PAYMENTS</AdminHeader>
      <p>AdminPayments</p>
    </>
  );
};

export default AdminPayments;
