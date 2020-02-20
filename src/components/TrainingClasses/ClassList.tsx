import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import ClassCard from "./ClassCard";

import axios from "axios";

interface Props {}

export interface Book {
  ID?: number;
  Title?: string;
  Description?: string;
  PageCount?: number;
  Excerpt?: string;
  PublishDate?: string;
}

const ClassList: React.FC<Props> = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    console.log("HELLO");
    axios
      .get("https://fakerestapi.azurewebsites.net/api/Books")
      .then(res => setBooks(res.data));
    return () => {};
  }, []);

  console.log(books);
  return (
    <>
      <Container>
        <Row>
          <Col md={9}>
            {books.map((b, i) => i < 20 && <ClassCard key={b.ID} book={b} />)}
          </Col>
          <Col md={3}>
            <p>Checkout box</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ClassList;
