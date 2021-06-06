import React from "react";
import "./search.css";

function Search({ onChange, value }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="search headline"
        className="search-box"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Search;
