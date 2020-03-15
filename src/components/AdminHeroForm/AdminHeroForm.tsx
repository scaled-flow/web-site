import React, { useReducer } from "react";

interface Props {}

export interface State {
  heroText: string;
  active: boolean;
}

type Action = { type: "heroText"; payload: string } | { type: "active"; payload: boolean };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "heroText":
      return { ...state };
    case "active":
      return { ...state };
    default:
      return { ...state };
  }
};
const AdminHeroForm: React.FC<Props> = () => {
  const [state, dispatch] = useReducer(reducer, { heroText: "", active: false });
  return (
    <>
      <p>AdminHeroForm</p>
    </>
  );
};

export default AdminHeroForm;
