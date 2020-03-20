import React from "react";

interface Props {}

const blogPosts = [1, 2, 3, 4, 5];

console.log(blogPosts);
const BlogList: React.FC<Props> = () => {
  return (
    <>
      <ul>
        {blogPosts.map((post, i) => (
          <li>Blog {i + 1}</li>
        ))}
      </ul>
    </>
  );
};

export default BlogList;
