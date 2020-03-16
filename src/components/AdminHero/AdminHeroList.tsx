import React, { useReducer, useEffect } from "react";

import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_HERO_INFO } from "../../graphQL/queries";
import HeroItem from "./HeroItem";

interface Props {}

export interface HeroItem {
  active?: boolean;
  hero_headline_text?: string;
  hero_sub_headline_text?: string;
  hero_button_text?: string;
  hero_button_pointer?: string;
  id?: number;
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
      let tempArr = state.items;
      tempArr.forEach(item => {
        if (item.id !== action.payload.id) {
          item.active = false;
        } else {
          if (action.payload.active === true) {
            item.active = true;
          }
        }
      });
      // console.log(tempArr);
      return { ...state, items: tempArr };
    default:
      return { ...state };
  }
};

const AdminHeroList: React.FC<Props> = () => {
  const { loading, error, data: heroData } = useQuery(GET_ALL_HERO_INFO);
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // initialize state
  useEffect(() => {
    const temp = !loading ? heroData.main_page_header : [];
    dispatch({ type: "init_state", payload: temp });
  }, [loading, heroData]);

  console.log(state);
  return (
    <>
      {state.items.map(item => (
        <HeroItem cb={dispatch} item={item} />
      ))}
    </>
  );
};

export default AdminHeroList;
