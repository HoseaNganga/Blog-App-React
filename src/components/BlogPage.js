import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const BlogPage = () => {
  const { blogs, handleDelete, handleCheck } = useContext(DataContext);
  const { id } = useParams();
  const blogToDisplay = blogs.find(
    (blog) => parseInt(blog.id) === parseInt(id)
  );
  return (
    <main>
      {blogToDisplay && (
        <li className="listItemContainer">
          <div className="flexListItems">
            <input
              type="checkbox"
              checked={blogToDisplay.checked}
              onChange={() => handleCheck(blogToDisplay.id)}
            />
            <div>
              <Link to={`/blog/${blogToDisplay.id}`}>
                <h3>{blogToDisplay.title}</h3>
              </Link>

              <p>{blogToDisplay.description}</p>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(blogToDisplay.id)}
            >
              <FaTrashAlt />
            </button>
          </div>
          <Link to={`/edit/${blogToDisplay.id}`} className="editButton">
            Edit
          </Link>
          <p className="timeStamp">{blogToDisplay.timeStamp}</p>
        </li>
      )}
      {!blogToDisplay && (
        <>
          <h2>Blog Not Found</h2>
          <Link to={"/"}>Click to go back to homePage</Link>
        </>
      )}
    </main>
  );
};

export default BlogPage;
