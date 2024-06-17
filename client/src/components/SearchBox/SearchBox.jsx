import React from "react";
import "./style.css";

function SearchBox() {
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
        <input type="text" placeholder="Search" className="inputSearch" />
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

        <div style={{ marginLeft: 30, marginTop: 10, display: "flex", flexDirection: "row" }}>
          <a href="/profile">
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
                href="/profile"
                style={{ textDecoration: "none", color: "#000" }}
              >
                sugaringbananaa
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBox;
