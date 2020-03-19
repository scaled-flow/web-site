import React, { useReducer, useState } from "react";

import { Button, ButtonProps } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { MainPageContent as State } from "../../graphQL/types";
import { INSERT_MAIN_PAGE_CONTENT } from "../../graphQL/mutations";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";
import FAInstructions from "./FAInstructions";

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

const handleSubmit = async (state: State, insertContentCb: any, setSubmitBtnCb: React.Dispatch<SubmitBtn>) => {
  if (
    state.service_offering_body === undefined ||
    state.service_offering_body === "" ||
    state.service_offering_font_awesome_icon === undefined ||
    state.service_offering_font_awesome_icon === "" ||
    state.service_offering_header === undefined ||
    state.service_offering_header === ""
  ) {
    setSubmitBtnCb({ variant: "danger", text: "Please fill out all fields..." });
    return setTimeout(() => setSubmitBtnCb({ variant: "primary", text: "Submit" }), 2000);
  }

  await insertContentCb({
    variables: {
      body: state.service_offering_body,
      icon: state.service_offering_font_awesome_icon,
      header: state.service_offering_header
    }
  });
  window.location.reload();
};

interface SubmitBtn extends ButtonProps {
  text: string;
}

const NewContactForm: React.FC<Props> = ({ cb }) => {
  const [submitBtn, setSubmitBtn] = useState<SubmitBtn>({ variant: "primary", text: "Submit" });

  const [state, dispatch] = useReducer(reducer, {} as State);

  const [insertContent] = useMutation(INSERT_MAIN_PAGE_CONTENT);

  return (
    <>
      <FAInstructions />
      <FormInput title="Service Header" action="header" cb={dispatch} type="text" />
      <FormTextarea title="Service Body" action="body" cb={dispatch} rows={3} />
      <FormInput title="Font Awesome Icon Classes" action="icon" cb={dispatch} type="text" />
      <Button
        variant={submitBtn.variant}
        className="mt-3 mb-3 mr-2"
        onClick={async () => handleSubmit(state, insertContent, setSubmitBtn)}
      >
        {submitBtn.text}
      </Button>
      <Button className="ml-2" onClick={cb} variant="warning">
        Cancel
      </Button>
    </>
  );
};

export default NewContactForm;
