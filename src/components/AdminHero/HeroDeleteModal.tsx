import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useMutation } from "@apollo/client";

import { HeroItem } from "./AdminHeroList";

import { DELETE_MAIN_PAGE_HEADER } from "../../graphQL/mutations";

interface Props {
  show: boolean;
  cb: any;
  item: HeroItem;
}

const HeroEditModal: React.FC<Props> = ({ show, cb, item }) => {
  const [deleteButtonText, setDeleteButtonText] = useState<string>("Yes, delete this header");

  const [deleteItem] = useMutation(DELETE_MAIN_PAGE_HEADER);

  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={cb}>
          <Modal.Title>Are you sure you want to delete this header?</Modal.Title>
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

export default HeroEditModal;
