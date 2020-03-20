import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import ContentItem from "./ContentItem";

import { GET_ALL_MAIN_PAGE_INFO } from "../../graphQL/queries";
import { MainPageContent } from "../../graphQL/types";

interface Props {}

const ContentList: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_ALL_MAIN_PAGE_INFO);
  const [items, setItems] = useState<MainPageContent[]>([] as MainPageContent[]);

  // init state
  useEffect(() => {
    const temp = !loading ? data.main_page_services : [];
    setItems(temp);
  }, [loading, data]);

  console.log(items);

  return (
    <>
      {items.map(item => (
        <ContentItem item={item} key={item.id} />
      ))}
    </>
  );
};

export default ContentList;
