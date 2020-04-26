import React, { useState, useEffect } from "react";

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_ALL_BLOG_POSTS, GET_CLASS_TYPES } from "../../graphQL/queries";
import { BlogPost } from "../../graphQL/types";

import "./Navigation.css";

const Navigation: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([] as BlogPost[]);
  const { loading, error, data } = useQuery(GET_ALL_BLOG_POSTS);
  const { loading: loadingTypes, error: errorTypes, data: dataTypes } = useQuery(GET_CLASS_TYPES)
  const [classTypes, setClassTypes] = useState([] as { class_type_id: number, class_type_full_name: Text, class_type_abbreviation: Text, class_type_tag_line: Text }[])
  useEffect(() => {
    const temp = !loading ? data.blog_posts : [];
    setPosts(temp);
  }, [loading, error, data]);

  useEffect(() => {
    setClassTypes(!loadingTypes && !errorTypes ? dataTypes.class_types : [])
  }, [loadingTypes, errorTypes, dataTypes])

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
              {classTypes.map(types =>
                <Link onClick={()=>{document.querySelector(".dropdown-menu")?.setAttribute("class","dropdown-menu"); document.querySelector(".dropdown")?.setAttribute("class","navlink dropdown nav-item")}} key={types.class_type_id} to={{ pathname:`/training/${types.class_type_abbreviation}`, state: {class_type: types.class_type_id, class_type_full_name: types.class_type_full_name, class_type_tag_line: types.class_type_tag_line}}} className="dropdown-link dropdown-item">
                    {types.class_type_full_name}
                  </Link>
              )}
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
            <Link className="navlink" to="/services">
              SERVICES
            </Link>
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
