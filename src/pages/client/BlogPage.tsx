import React from "react";

import { RouteComponentProps } from "react-router-dom";
import Header from "../../components/Header/Header";

interface Props extends RouteComponentProps {}

const BlogPage: React.FC<Props> = ({ ...props }: Props) => {
  return (
    <>
      <Header title="Blog" />
    </>
  );
};

export default BlogPage;
