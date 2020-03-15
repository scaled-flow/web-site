import React, { useReducer, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_HERO_TEXT } from "../../graphQL/queries";
import HeroItem from "./HeroItem";

interface Props {}

export interface HeroItem {
  active: boolean;
  hero_text: string;
  id: number;
}

interface State {
  items: HeroItem[];
}

type Action =
  | { type: "switch_active"; payload: HeroItem }
  | { type: "change_text"; payload: string }
  | { type: "init_state"; payload: HeroItem[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "init_state":
      return { items: action.payload };
    case "change_text":
      return { ...state };
    case "switch_active":
      const index = action.payload.id - 1;
      let tempArr = state.items;
      tempArr.forEach(item => {
        if (item.id !== action.payload.id) {
          if (action.payload.active === true) {
            item.active = false;
          }
        } else {
          if (action.payload.active === true) {
            item.active = true;
          }
        }
      });
      console.log(tempArr);
      return { ...state, items: tempArr };
    default:
      return { ...state };
  }
};

const AdminHeroList: React.FC<Props> = () => {
  const { loading, error, data: heroData } = useQuery(GET_HERO_TEXT);
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // initialize state
  useEffect(() => {
    const temp = !loading ? heroData.main_page : [];
    dispatch({ type: "init_state", payload: temp });
  }, [loading, heroData]);

  return (
    <>
      {!loading &&
        state.items.map((item: HeroItem, i: number) => (
          <HeroItem key={i} item={item} cb={dispatch}>
            {item.hero_text}
          </HeroItem>
        ))}
    </>
  );
};

export default AdminHeroList;
