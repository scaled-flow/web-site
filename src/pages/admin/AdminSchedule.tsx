import React from "react";

import { RouteComponentProps } from "react-router-dom";

import AdminHeader from "../../components/Header/AdminHeader";

interface Props extends RouteComponentProps {}

const AdminSchedule: React.FC<Props> = () => {
  return (
    <>
      <AdminHeader>SCHEDULE</AdminHeader>
      <p>AdminSchedule</p>
    </>
  );
};

export default AdminSchedule;
