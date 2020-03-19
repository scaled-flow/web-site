import React, { useReducer } from "react";

import { MainPageContent as State } from "../../graphQL/types";

// export interface MainPageContent {
//   service_offering_body: string;
//   service_offering_font_awesome_icon: string;
//   service_offering_header: string;
//   id: number;
//   active: boolean;
// }

interface Props {
  cb: any;
}

type Action =
  | { type: "body"; payload: string }
  | { type: "icon"; payload: string }
  | { type: "header"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "body":
      return { ...state, service_offering_body: action.payload };
    case "header":
      return { ...state, service_offering_header: action.payload };
    case "icon":
      return { ...state, service_offering_font_awesome_icon: action.payload };
  }
};

const NewContactForm: React.FC<Props> = ({ cb }) => {
  const [state, dispatch] = useReducer(reducer, {} as State);

  return (
    <>
      <p>NewContactForm</p>
    </>
  );
};

export default NewContactForm;
