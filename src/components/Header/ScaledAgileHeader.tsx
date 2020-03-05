import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Header.css";

interface Props {
  title: string;
  description: string;
  type: "SA" | "LeSS";
}

const Header: React.FC<Props> = ({ title, description, type }: Props) => {
  return (
    <header className="training-header">
      <div className="overlay">
        <Container className="home-inner">
          <Row className="header-content">
            <Col md={8}>
              <h3>{title}</h3>
              <h6>{description}</h6>
            </Col>
            <Col md={4}>
              <Image
                fluid
                src="https://api.media.atlassian.com/file/15f012f9-870e-43f0-9907-cd2e9d9ea7bd/image?mode=full-fit&client=bb26e63e-7a26-41a7-aebb-c8bac535fa97&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJiYjI2ZTYzZS03YTI2LTQxYTctYWViYi1jOGJhYzUzNWZhOTciLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpmaWxlOjE1ZjAxMmY5LTg3MGUtNDNmMC05OTA3LWNkMmU5ZDllYTdiZCI6WyJyZWFkIl19LCJleHAiOjE1ODM0Mzc2NTIsIm5iZiI6MTU4MzQzNDI5Mn0.ZdHPxxKIy0I2BNHFiKCLIdF-cTrmEqPHJR7cVvyxtlU"
              />
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  );
};

export default Header;
