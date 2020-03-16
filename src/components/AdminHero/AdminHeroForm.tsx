import React, { useReducer } from "react";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";
import FormSelect from "../Forms/FormSelect";
import { INSERT_MAIN_PAGE_HEADER } from "../../graphQL/mutations";
import { GET_ALL_HERO_INFO } from "../../graphQL/queries";

import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

interface Props {}

export interface State {
  heroHeadlineText?: string;
  heroSubHeadlineText?: string;
  heroButtonText?: string;
  heroButtonPointer?: string;
  active: boolean;
}

type Action =
  | { type: "heroHeadlineText"; payload: string }
  | { type: "heroSubHeadlineText"; payload: string }
  | { type: "heroButtonText"; payload: string }
  | { type: "heroButtonPointer"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "heroHeadlineText":
      return { ...state, heroHeadlineText: action.payload };
    case "heroSubHeadlineText":
      return { ...state, heroSubHeadlineText: action.payload };
    case "heroButtonText":
      return { ...state, heroButtonText: action.payload };
    case "heroButtonPointer":
      return { ...state, heroButtonPointer: action.payload };
    default:
      return { ...state };
  }
};
const AdminHeroForm: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, { active: false });

  const [addHeroInfo] = useMutation(INSERT_MAIN_PAGE_HEADER);
  return (
    <>
      <FormInput title="Hero Headline Text" cb={dispatch} action="heroHeadlineText" type="text" />
      <FormTextarea title="Hero Sub-Headline Text" rows={5} cb={dispatch} action="heroSubHeadlineText" />
      <FormInput title="Hero Button Text" cb={dispatch} action="heroButtonText" type="text" />
      <FormInput title="Hero Button Pointer (eg. /classes/SaFE)" cb={dispatch} action="heroButtonPointer" type="text" />
      <Button
        className="mt-3"
        title="submit"
        onClick={() => {
          console.log(state);
          addHeroInfo({
            variables: {
              heroHeadlineText: state.heroHeadlineText,
              heroSubHeadlineText: state.heroSubHeadlineText,
              heroButtonText: state.heroButtonText,
              heroButtonPointer: state.heroButtonPointer,
              active: state.active
            }
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default AdminHeroForm;
