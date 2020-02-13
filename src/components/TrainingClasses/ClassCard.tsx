import React from "react";

import { Book } from "./ClassList";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./ClassCard.css";
interface Props {
  book: Book;
}

const ClassCard: React.FC<Props> = ({ book }) => {
  return (
    <>
      <div className="class-card">
        <Row>
          <Col md={10}>
            <p>{book.Title}</p>
            <p>{book.Description}</p>
            <p>{book.PublishDate}</p>
          </Col>
          <Col md={2}>
            <div className="align-middle">
              <Icon
                icon={faPlus}
                color="white"
                size="3x"
                className="plus-icon"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ClassCard;
