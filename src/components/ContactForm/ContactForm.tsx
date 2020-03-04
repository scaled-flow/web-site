import React, { useState } from "react";
import "./ContactForm.css";

import { Row, Col, Form, Button } from "react-bootstrap";

interface Props {}

interface ContactInfo {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm: React.FC<Props> = () => {
  const [formInfo, setFormInfo] = useState<ContactInfo>({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    message: ""
  });

  function sendContactData() {
    fetch("https://t5oilhwxk3.execute-api.us-east-2.amazonaws.com/dev/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formInfo)
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="contact-form">
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInfo({
                      ...formInfo,
                      fname: e.target.value
                    })
                  }
                  type="name"
                  placeholder="First Name"
                  aria-label="first name"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInfo({
                      ...formInfo,
                      email: e.target.value
                    })
                  }
                  type="email"
                  placeholder="Email"
                  aria-label="email"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formLastName">
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInfo({
                      ...formInfo,
                      lname: e.target.value
                    })
                  }
                  type="text"
                  placeholder="Last Name"
                  aria-label="last name"
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInfo({
                      ...formInfo,
                      phone: e.target.value
                    })
                  }
                  type="tel"
                  placeholder="Phone Number"
                  aria-label="phone number"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formMessageArearea">
                <Form.Control
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormInfo({
                      ...formInfo,
                      message: e.target.value
                    })
                  }
                  as="textarea"
                  rows="3"
                  placeholder="Your message"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                block
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  sendContactData();
                }}
              >
                Contact Us
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ContactForm;
