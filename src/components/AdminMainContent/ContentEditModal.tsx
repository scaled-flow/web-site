import React, { useReducer, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { UPDATE_MAIN_PAGE_CONTENT } from "../../graphQL/mutations";
import { MainPageContent as State } from "../../graphQL/types";

import FormInput from "../Forms/FormInput";
import FormTextarea from "../Forms/FormTextarea";
import FAInstructions from "./FAInstructions";

interface Props {
  show: boolean;
  cb: any;
  item: State;
}

type Action =
  | { type: "header"; payload: string }
  | { type: "body"; payload: string }
  | { type: "icon"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "body":
      return { ...state, service_offering_body: action.payload };
    case "header":
      return { ...state, service_offering_header: action.payload };
    case "icon":
      return { ...state, service_offering_font_awesome_icon: action.payload };
    default:
      return { ...state };
  }
};

const handleSubmit = async (state: State, setSaveButtonTextCb: React.Dispatch<string>, updateContent: any) => {
  // This block checks for bad inputs
  if (
    state.service_offering_body === "" ||
    state.service_offering_font_awesome_icon === "" ||
    state.service_offering_header === ""
  ) {
    setSaveButtonTextCb("Please enter all fields");
    return setTimeout(() => setSaveButtonTextCb("Save"), 3000);
  }

  setSaveButtonTextCb("Saving...");

  await updateContent({
    variables: {
      id: state.id,
      body: state.service_offering_body,
      icon: state.service_offering_font_awesome_icon,
      header: state.service_offering_header
    }
  });
  window.location.reload();
  // setTimeout(() => window.location.reload(), 2000); // For Testing
};

const ContentEditModal: React.FC<Props> = ({ show, cb, item }) => {
  const [state, dispatch] = useReducer(reducer, item);

  const [saveButtonText, setSaveButtonText] = useState<string>("Save");

  const [updateContent] = useMutation(UPDATE_MAIN_PAGE_CONTENT);

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={cb}>
          <Modal.Title>Edit Heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FAInstructions />
          <FormInput
            title="Headline"
            cb={dispatch}
            action="header"
            type="text"
            placeholder={state.service_offering_header}
          />
          <FormTextarea
            title="Content"
            cb={dispatch}
            action="body"
            rows={3}
            placeholder={state.service_offering_body}
          />
          <FormInput
            title="Button Text"
            cb={dispatch}
            action="icon"
            type="text"
            placeholder={state.service_offering_font_awesome_icon}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cb}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSubmit(state, setSaveButtonText, updateContent);
            }}
          >
            {saveButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContentEditModal;
