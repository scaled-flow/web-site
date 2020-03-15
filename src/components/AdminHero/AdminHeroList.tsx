import React from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_HERO_TEXT } from "../../graphQL/queries";
import HeroItem from "./HeroItem";

interface Props {}

interface HeroItem {
  active: boolean;
  hero_text: string;
  id: number;
}

const AdminHeroList: React.FC<Props> = () => {
  const { loading, error, data: heroData } = useQuery(GET_HERO_TEXT);

  !loading && console.log(heroData);
  return (
    <>{!loading && heroData.main_page.map((item: HeroItem, i: number) => <HeroItem>{item.hero_text}</HeroItem>)}</>
  );
};

export default AdminHeroList;
