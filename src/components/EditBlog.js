import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const EditBlog = () => {
  const {
    blogs,
    handleEdit,
    editTitle,
    setEditTitle,
    editDescription,
    setEditDescription,
    handleCancel,
  } = useContext(DataContext);
  const { id } = useParams();
  const blogToDisplay = blogs.find(
    (blog) => parseInt(blog.id) === parseInt(id)
  );
  useEffect(() => {
    if (blogToDisplay) {
      setEditDescription(blogToDisplay.description);
      setEditTitle(blogToDisplay.title);
    }
  }, [setEditDescription, setEditTitle, blogToDisplay]);
  return (
    <main>
      <div className="addBlogContainer">
        <h2>Edit Blog:</h2>
        <form className="addBlogForm" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Title"
              autoComplete="on"
              id="title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              autoComplete="on"
              id="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </div>
          <div className="formButtons">
            <button type="submit" onClick={() => handleEdit(blogToDisplay.id)}>
              Submit
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditBlog;
