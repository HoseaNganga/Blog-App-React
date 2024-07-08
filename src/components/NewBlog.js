import React from "react";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const NewBlog = () => {
  const {
    newTitle,
    setNewTitle,
    newDescription,
    setNewDescription,
    handleAddBlog,
  } = useContext(DataContext);
  return (
    <main>
      <div className="addBlogContainer">
        <h2>Create Blog:</h2>
        <form className="addBlogForm" onSubmit={handleAddBlog}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              placeholder="Title"
              autoComplete="on"
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              type="text"
              placeholder="Description"
              autoComplete="on"
              id="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="formButtons">
            <button type="submit">Submit</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default NewBlog;
