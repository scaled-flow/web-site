import React from "react";

import { Link, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const AdminHomePage: React.FC<Props> = () => {
  return (
    <>
      <p>Admin Home Page</p>
    </>
  );
};

export default AdminHomePage;
