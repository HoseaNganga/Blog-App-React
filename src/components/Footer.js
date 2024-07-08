import React from "react";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const Footer = () => {
  const { blogs } = useContext(DataContext);
  return (
    <footer className="footer">
      <p>
        {blogs.length} {blogs.length === 1 ? "blog" : "blogs"} remaining
      </p>
      <p>&copy; All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
