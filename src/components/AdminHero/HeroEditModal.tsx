import React, { useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPDATE_MAIN_PAGE_HEADER_CONTENT } from "../../graphQL/mutations";
import { HeroItem as State } from "./AdminHeroList";
import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";

interface Props {
  show: boolean;
  cb: any;
  item: State;
}

type Action =
  | { type: "heroHeadlineText"; payload: string }
  | { type: "heroSubHeadlineText"; payload: string }
  | { type: "heroButtonText"; payload: string }
  | { type: "heroButtonPointer"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "heroButtonPointer":
      return { ...state, hero_button_pointer: action.payload };
    case "heroButtonText":
      return { ...state, hero_button_text: action.payload };
    case "heroHeadlineText":
      return { ...state, hero_headline_text: action.payload };
    case "heroSubHeadlineText":
      return { ...state, hero_sub_headline_text: action.payload };
    default:
      return { ...state };
  }
};

const handleSubmit = async (state: State, setSaveButtonTextCb: React.Dispatch<string>, updateHeaderContentCb: any) => {
  // This block checks for bad inputs
  if (
    state.hero_button_pointer === "" ||
    state.hero_button_text === "" ||
    state.hero_headline_text === "" ||
    state.hero_sub_headline_text === ""
  ) {
    setSaveButtonTextCb("Please enter all fields");
    return setTimeout(() => setSaveButtonTextCb("Save"), 3000);
  }

  // This block checks for spaces at the end of the string, and recursively deletes them
  const lastCharIndex = state.hero_button_pointer?.length! - 1;
  if (state.hero_button_pointer?.charAt(lastCharIndex) === " ") {
    const temp = state.hero_button_pointer.slice(0, lastCharIndex);
    state.hero_button_pointer = temp;
    console.log(temp, temp.length);
    handleSubmit(state, setSaveButtonTextCb, updateHeaderContentCb);
    return;
  }
  // This block replaces spaces with -
  if (state.hero_button_pointer?.includes(" ")) {
    const temp = state.hero_button_pointer?.split(" ").join("-");
    state.hero_button_pointer = temp;
  }

  // this block adds a / if need be
  if (state.hero_button_pointer?.charAt(0) !== "/") {
    const temp = `/${state.hero_button_pointer}`;
    state.hero_button_pointer = temp;
  }

  setSaveButtonTextCb("Saving...");

  await updateHeaderContentCb({
    variables: {
      heroButtonPointer: state.hero_button_pointer,
      heroButtonText: state.hero_button_text,
      heroHeadlineText: state.hero_headline_text,
      heroSubHeadlineText: state.hero_sub_headline_text,
      id: state.id
    }
  });
  window.location.reload();
  // setTimeout(() => window.location.reload(), 2000); // For Testing
};

const HeroEditModal: React.FC<Props> = ({ show, cb, item }) => {
  const [state, dispatch] = useReducer(reducer, item);

  const [saveButtonText, setSaveButtonText] = useState<string>("Save");

  const [updateHeaderContent] = useMutation(UPDATE_MAIN_PAGE_HEADER_CONTENT);

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={cb}>
          <Modal.Title>Edit Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormInput
            title="Headline"
            cb={dispatch}
            action="heroHeadlineText"
            type="text"
            placeholder={state.hero_headline_text}
          />
          <FormTextarea
            title="Sub-Headline"
            cb={dispatch}
            action="heroSubHeadlineText"
            rows={3}
            placeholder={state.hero_sub_headline_text}
          />
          <FormInput
            title="Button Text"
            cb={dispatch}
            action="heroButtonText"
            type="text"
            placeholder={state.hero_button_text}
          />
          <FormInput
            title="Button Pointer (eg. /classes/SaFE)"
            cb={dispatch}
            action="heroButtonPointer"
            type="text"
            placeholder={state.hero_button_pointer}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cb}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(state, setSaveButtonText, updateHeaderContent);
            }}
          >
            {saveButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HeroEditModal;
