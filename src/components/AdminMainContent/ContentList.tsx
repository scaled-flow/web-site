import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ALL_MAIN_PAGE_INFO } from "../../graphQL/queries";

interface Props {}

const ContentList: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_ALL_MAIN_PAGE_INFO);

  console.log(!loading && data);

  return (
    <>
      <p>ContentList</p>
    </>
  );
};

export default ContentList;
