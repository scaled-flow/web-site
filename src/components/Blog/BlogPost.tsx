import React, { useEffect, useState } from "react";

import { Row, Col, Image } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import moment from "moment";

import { GetCurrentBlog } from "../../graphQL/queries";
import { BlogPost as iBlogPost } from "../../graphQL/types";
import "./Blog.css";

interface Props {
  blogID: string;
}

const BlogPost: React.FC<Props> = ({ blogID }) => {
  const [post, setPost] = useState<iBlogPost>({} as iBlogPost);
  const { loading, error, data } = useQuery(GetCurrentBlog(blogID));
  useEffect(() => {
    const temp = !loading && data.blog_posts[0];
    setPost(temp);
  }, [loading, error, data]);

  console.log(post);
  return (
    <>
      <Row>
        <Col>
          <h1>{post.header}</h1>
          <p>
            {post.author} - {moment(post.entry_date, "YYYY-MM-DD").format("MMMM Do, YYYY")}
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={7}>
          <p>{post.opening}</p>
        </Col>
        <Col>
          <Image src={post.image_url} alt={post.sub_header_one} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>{post.sub_header_one}</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{post.content_01}</p>
        </Col>
      </Row>
      {post.cta_01 && (
        <Row>
          <Col>
            <h5 className="cta">{post.cta_01}</h5>
          </Col>
        </Row>
      )}
      {post.sub_header_two && (
        <Row>
          <Col>
            <h3>{post.sub_header_two}</h3>
          </Col>
        </Row>
      )}
      {post.content_02 && (
        <Row>
          <Col>
            <p>{post.content_02}</p>
          </Col>
        </Row>
      )}
      {post.cta_02 && (
        <Row>
          <Col>
            <h5 className="cta">{post.cta_02}</h5>
          </Col>
        </Row>
      )}
    </>
  );
};

export default BlogPost;
