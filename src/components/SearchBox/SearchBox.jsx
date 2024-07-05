import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SearchBox = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const results = await onSearch(searchTerm);
      setSearchResults(results);
      console.log(results);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleUserClick = (id) => {
    navigate(`/other/${id}`);
  };

  return (
    <div id="searchbox">
      {/* SearchBox Header */}
      <div className="searchHeader" style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #ccc" }}>
        <h1>Search</h1>
        <input
          type="text"
          placeholder="Search"
          className="inputSearch"
          id="inputSearch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>Search</button>
      </div>

      {/* Search Results */}
      <div className="searchResults" style={{ display: "flex", flexDirection: "column" }}>
        {searchResults.length > 0 ? (
          searchResults.map((user) => (
            <div key={user.userName} style={{ margin: 20, display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => handleUserClick(user.id)}>
              <div
                className="avt"
                style={{
                  width: 40,
                  height: 40,
                  // background: `url(${user.userAvatar})`,
                  backgroundColor: "#ccc",
                  backgroundSize: "cover",
                  borderRadius: 100,
                }}
              />
              <div style={{ marginLeft: 0 }}>
                <p className="userName">{user.userName}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ margin: 20 }}>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
