import React from "react";
import DisplayBlogItem from "./DisplayBlogItem";

const DisplayBlogList = ({ blogs, handleDelete, handleCheck }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <DisplayBlogItem
          key={blog.id}
          blog={blog}
          handleDelete={handleDelete}
          handleCheck={handleCheck}
        />
      ))}
    </ul>
  );
};

export default DisplayBlogList;
