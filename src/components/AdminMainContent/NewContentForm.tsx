import React, { useReducer } from "react";

import { Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { MainPageContent as State } from "../../graphQL/types";
import { INSERT_MAIN_PAGE_CONTENT } from "../../graphQL/mutations";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";

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

  const [insertContent] = useMutation(INSERT_MAIN_PAGE_CONTENT);

  return (
    <>
      <div className="fa-instructions">
        <h3>Font Awesome Instructions</h3>
        <ol className="text-left">
          <li>
            Go to{" "}
            <a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer">
              Font Awesome
            </a>
          </li>
          <li>Search for the icon you want</li>
          <li>Click on that icon</li>
          <li>
            Click the button that <span>Start Using This Icon</span>
          </li>
          <li>
            Copy <span>just</span> the text inside the <code>class</code> attribute.{" "}
            <span>Don't copy the quotations.</span> It will look something like: <code>fab fa-accessible-icon</code>
          </li>
        </ol>
      </div>
      <FormInput title="Service Header" action="header" cb={dispatch} type="text" />
      <FormTextarea title="Service Body" action="body" cb={dispatch} rows={3} />
      <FormInput title="Font Awesome Icon Classes" action="icon" cb={dispatch} type="text" />
      <Button
        className="mt-3 mb-3"
        onClick={async () => {
          await insertContent({
            variables: {
              body: state.service_offering_body,
              icon: state.service_offering_font_awesome_icon,
              header: state.service_offering_header
            }
          });
          window.location.reload();
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default NewContactForm;
