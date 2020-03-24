import React, { useState, useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ALL_BLOG_POSTS } from "../../graphQL/queries";
import { BlogPost } from "../../graphQL/types";

import "./Navigation.css";

const Navigation: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([] as BlogPost[]);
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);
  useEffect(() => {
    const temp = !loading ? data.blog_posts : [];
    setPosts(temp);
  }, [loading, error, data]);

  return (
    <Navbar bg="info" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand>
          <Link to="/">SCALED FLOW &reg;</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link className="navlink" to="/about">
              ABOUT
            </Link>
            <Link className="navlink" to="/assessment">
              ASSESSMENTS
            </Link>
            <NavDropdown className="navlink" title="TRAINING" id="nav-dropdown" style={{ padding: 0 }}>
              <Link to="/training/scaled-agile" className="dropdown-link dropdown-item">
                Scaled Agile Training
              </Link>
              <Link to="/training/LeSS" className="dropdown-link dropdown-item">
                LeSS Training
              </Link>
            </NavDropdown>
            <Link
              className="navlink"
              to={
                posts.length !== 0
                  ? `/blog/${posts[0].header.split(" ").join("-")}/${posts[0].entry_date}/${posts[0].blog_post_id}`
                  : "/blog"
              }
            >
              BLOG
            </Link>
            {/* <Link className="navlink" to="/services">
              SERVICES
            </Link> */}
            <Link className="navlink" to="/contact">
              CONTACT
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
