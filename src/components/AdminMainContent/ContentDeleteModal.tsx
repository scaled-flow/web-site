import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { MainPageContent } from "../../graphQL/types";
import { DELETE_MAIN_PAGE_CONTENT } from "../../graphQL/mutations";

interface Props {
  show: boolean;
  cb: any;
  item: MainPageContent;
}

const ContentDeleteModal: React.FC<Props> = ({ show, cb, item }) => {
  const [deleteButtonText, setDeleteButtonText] = useState<string>("Yes, delete this header");

  const [deleteItem] = useMutation(DELETE_MAIN_PAGE_CONTENT);

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={cb}>
          <Modal.Title>Are you sure you want to delete this item?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={cb}>
            No go back
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              setDeleteButtonText("Deleting...");
              const answer = await deleteItem({ variables: { id: item.id } });
              console.log(answer);
              window.location.reload();
            }}
          >
            {deleteButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContentDeleteModal;
