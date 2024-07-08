import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main>
      <h2>Page Not Found</h2>
      <Link to={"/"}>Click here to go back to homePage</Link>
    </main>
  );
};

export default NotFound;
