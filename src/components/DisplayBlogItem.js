import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const DisplayBlogItem = ({ blog, handleDelete, handleCheck }) => {
  return (
    <li className="listItemContainer">
      <div className="flexListItems">
        <input
          type="checkbox"
          checked={blog.checked}
          onChange={() => handleCheck(blog.id)}
        />
        <div>
          <Link to={`/blog/${blog.id}`}>
            <h3>{blog.title}</h3>
          </Link>

          <p>
            {blog.description.length > 25
              ? blog.description.slice(0, 25)
              : blog.description}
            ...
          </p>
        </div>
        <button type="button" onClick={() => handleDelete(blog.id)}>
          <FaTrashAlt />
        </button>
      </div>
      <p className="timeStamp">{blog.timeStamp}</p>
    </li>
  );
};

export default DisplayBlogItem;
