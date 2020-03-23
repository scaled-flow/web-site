import React, { useState, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { BlogPost } from "../../graphQL/types";
import { GET_ALL_BLOG_POSTS } from "../../graphQL/queries";

interface Props {}

const BlogList: React.FC<Props> = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);
  const [posts, setPosts] = useState<BlogPost[]>([] as BlogPost[]);
  useEffect(() => {
    const temp = !loading ? data.blog_posts : [];
    setPosts(temp);
  }, [loading, error, data]);

  return (
    <>
      <ListGroup variant="flush">
        {posts.map(post => (
          <ListGroup.Item key={post.blog_post_id}>
            <Link to={`/blog/${post.header.split(" ").join("-")}/${post.entry_date}/${post.blog_post_id}`}>
              {post.header}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default BlogList;
