import React, { useState } from "react";
import "./style.css";
import CreatePost from "../CreatePost/CreatePost";

function SidebarLeft({ toggleSidebar, toggleSearchBox, refreshHomepage }) {
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);

  const openCreatePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const closeCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const handleSearchClick = () => {
    toggleSidebar();
    toggleSearchBox();
  };

  return (
    <div id="sidebar-left">
      <a href="./">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2e5a25def5e4ffa9bdc08ae25dacb4096ac6c76f08dd7c4c241bf34b4c8bf15?"
          alt="instagram"
          className="logo"
        />
      </a>

      <div className="sidebar-left-icon">
        {/* Home */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2b9a3665605d71e08830fc2cb4a7946ca91fcfdc0d4bda4c76eb364470b1236?"
            alt="home"
          />
          <h4>
            <a href="./" style={{ textDecoration: "none", color: "#000" }}>
              Home
            </a>
          </h4>
        </div>

        {/* Search */}
        <div className="icon" onClick={handleSearchClick}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c9ad87865738cc2fea7fd9412313558cd42a38b1202bd13d3b0289932e84e0f?"
            alt="search"
          />
          <p>Search</p>
        </div>

        {/* Message */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0c253f9a22c71795bce1e57f56a077d127f9aa4c6848f3e4433d58013479626?"
            alt="message"
          />
          <p>
            <a
              href="./message"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Messages
            </a>
          </p>
        </div>

        {/* Notifications */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89eaed4d278d74f14902fec2d5c65f7d6665c8e46f643e984859ab893a17d2ff?"
            alt="notification"
          />
          <p>Notifications</p>
        </div>

        {/* Create */}
        <div className="icon" onClick={openCreatePopup}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/461acdfcd36914838f13cc932028dc4ebb142f7d899dfcd00325a1ed09fc0ecf?"
            alt="create"
          />
          <p>Create</p>
        </div>

        {/* Profile */}
        <div className="icon">
          <div
            className="Avatar"
            style={{
              width: 30,
              height: 30,
              background: "#D9D9D9",
              borderRadius: 9999,
            }}
          />
          <p>
            <a
              href="./profile"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Profile
            </a>
          </p>
        </div>

        {/* Settings */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4756ffd96725539dea28c8b7abddfec5db88e4aed5cfb92466e9daeadd59a135?"
            alt="setting"
          />
          <p>
            <a
              href="./setting"
              style={{ textDecoration: "none", color: "#000" }}
            >
              Setting
            </a>
          </p>
        </div>
      </div>
      {/* Pop-up */}
      {isCreatePopupOpen && <CreatePost onClose={closeCreatePopup} refreshHomepage={refreshHomepage} />}
    </div>
  );
}

export default SidebarLeft;
