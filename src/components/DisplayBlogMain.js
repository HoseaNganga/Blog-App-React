import React from "react";
import DisplayBlogList from "./DisplayBlogList";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const DisplayBlogMain = () => {
  const { searchResult, handleDelete, handleCheck, fetchError, isLoading } =
    useContext(DataContext);
  return (
    <>
      {fetchError !== null ? <h2>{fetchError}</h2> : null}
      {isLoading && fetchError === null && (
        <button type="button" class="my-button" disabled>
          <svg className="my-spinner" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="black"
              stroke-width="2"
              fill="transparent"
            />
          </svg>
          Loading Data...
        </button>
      )}
      {searchResult.length ? (
        <main className="displayBlogContainer">
          <h2>All Blogs</h2>
          <DisplayBlogList
            blogs={searchResult}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        </main>
      ) : (
        <h3>BlogList is empty</h3>
      )}
    </>
  );
};

export default DisplayBlogMain;
