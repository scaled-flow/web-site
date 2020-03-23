import React from "react";

import { RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Header from "../../components/Header/Header";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import BlogPost from "../../components/Blog/BlogPost";
import BlogList from "../../components/Blog/BlogList";
interface Props extends RouteComponentProps {
  blogID?: any;
  blogHeadline?: string;
  blogDate?: string;
}

const BlogPage: React.FC<Props> = ({ blogID, ...props }) => {
  console.log(props);
  return (
    <>
      <Header title="Blog" />
      <ContentContainer>
        <Container>
          <Row>
            <Col md={9}>
              <BlogPost blogID={blogID} />
            </Col>
            <Col md={3}>
              <BlogList />
            </Col>
          </Row>
        </Container>
      </ContentContainer>
    </>
  );
};

export default BlogPage;
