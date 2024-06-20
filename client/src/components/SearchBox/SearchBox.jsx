import React, { useState } from "react";
import "./style.css";

function SearchBox({ handleSearch, searchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <div id="searchbox">
      
      {/* SearchBox Header */}
      <div
        className="searchHeader"
        style={{
          display: "flex",
          flexDirection: "column",
          borderBottom: "1px solid #ccc",
        }}
      >
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search"
          className="inputSearch"
          id="inputSearch"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {/* SearchBox History */}
      <div
        className="history"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          className="historyHeader"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <p>Recent</p>
          <p style={{ color: "#4192EF" }}>Clear all</p>
        </div>

        {searchResults.length > 0 && (
          <div style={{ marginLeft: 30, marginTop: 10, display: "flex", flexDirection: "row" }}>
            {searchResults.map(user => (
              <div key={user.userId} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <a href={`/profile/${user.userId}`}>
                  <div
                    className="avt"
                    style={{
                      width: 40,
                      height: 40,
                      background: "#D9D9D9",
                      borderRadius: 100,
                    }}
                  />
                </a>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto 0",
                    transform: "translateY(-5%)",
                  }}
                >
                  <p className="userName">
                    <a
                      href={`/profile/${user.userId}`}
                      style={{ textDecoration: "none", color: "#000" }}
                    >
                      {user.userName}
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
