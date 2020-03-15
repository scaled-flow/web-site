import React, { useReducer } from "react";

import FormTextarea from "../Forms/FormTextarea";
import FormSelect from "../Forms/FormSelect";
import { INSERT_HERO_TEXT } from "../../graphQL/mutations";
import { GET_HERO_TEXT } from "../../graphQL/queries";

import { Button } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";

interface Props {}

export interface State {
  heroText: string;
  active: boolean;
}

type Action = { type: "heroText"; payload: string } | { type: "active"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "heroText":
      return { ...state, heroText: action.payload };
    case "active":
      const temp = action.payload === "active" ? true : false;
      return { ...state, active: temp };
    default:
      return { ...state };
  }
};
const AdminHeroForm: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, { heroText: "", active: false });

  const [addHeroText] = useMutation(INSERT_HERO_TEXT);
  return (
    <>
      <FormTextarea title="Hero Text" rows={5} cb={dispatch} action="heroText" />
      <FormSelect options={["active", "inactive"]} action="active" cb={dispatch} />
      <Button
        className="mt-3"
        title="submit"
        onClick={() => {
          console.log(state);
          addHeroText({ variables: { heroText: state.heroText, active: state.active } });
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default AdminHeroForm;
