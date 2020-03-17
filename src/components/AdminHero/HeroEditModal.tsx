import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  show: boolean;
  cb: any;
}

const HeroEditModal: React.FC<Props> = ({ show, cb }) => {
  return (
    <>
      <Modal show={show}>
        <Modal.Header closeButton onClick={cb}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cb}>
            Close
          </Button>
          <Button variant="primary" onClick={cb}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HeroEditModal;
