import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import DataContext from "../DataContext/DataContext";

const Header = () => {
  const { searchValue, setSearchValue } = useContext(DataContext);
  return (
    <header>
      <h1>BlogList</h1>
      <nav className="nav">
        <Link to={"/"}>Home</Link>
        <Link to={"/blog"}>Create Blog</Link>
        <Link to={"/about"}>About</Link>
      </nav>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="search.."
          autoComplete="on"
          className="searchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>
    </header>
  );
};

export default Header;
