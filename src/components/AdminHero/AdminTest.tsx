import React from "react";

import { useQuery } from "@apollo/client";

import { GET_ALL_HERO_INFO } from "../../graphQL/queries";

interface Props {}

const AdminTest: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_ALL_HERO_INFO);
  console.log(data);

  return <p>test</p>;
};

export default AdminTest;
