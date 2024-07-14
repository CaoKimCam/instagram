import React from "react";
import "./style.css";
import logoIcon from "../../assets/logo-icon.gif";

function SidebarSimple({ toggleSearchBox, userAvatar, openCreatePost }) {

  // Hàm xử lý khi nhấn nút Search
  const handleSearchClick = () => {
    // toggleSidebar();
    toggleSearchBox();
  };

  const handleOpenCreatePost = () => {
    openCreatePost();
  }

  return (
    <div id="sidebar-simple">

      {/* Logo bản thu gọn */}
      <a href="./">
        <img src={logoIcon} alt="instagram" className="logoGif" />
      </a>

      <div className="sidebar-simple-icon">
        {/* Home */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2b9a3665605d71e08830fc2cb4a7946ca91fcfdc0d4bda4c76eb364470b1236?"
            alt="home"
          />
        </div>

        {/* Search */}
        <div className="icon" onClick={handleSearchClick}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c9ad87865738cc2fea7fd9412313558cd42a38b1202bd13d3b0289932e84e0f?"
            alt="search"
          />
        </div>

        {/* Message */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0c253f9a22c71795bce1e57f56a077d127f9aa4c6848f3e4433d58013479626?"
            alt="message"
          />
        </div>

        {/* Notifications */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89eaed4d278d74f14902fec2d5c65f7d6665c8e46f643e984859ab893a17d2ff?"
            alt="notification"
          />
        </div>

        {/* Create */}
        <div className="icon" onClick={handleOpenCreatePost}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/461acdfcd36914838f13cc932028dc4ebb142f7d899dfcd00325a1ed09fc0ecf?"
            alt="create"
          />
        </div>

        {/* Profile */}
        <div className="icon">
          <a href="./profile">
            <div
              className="divAvatar"
              style={{
                width: 30,
                height: 30,
                background: "#D9D9D9",
                borderRadius: 9999,
              }}
            />
            <img src={userAvatar} alt="" className="Avatar" style={{ width: 30, height: 30, background: "#D9D9D9", borderRadius: 9999, objectFit: "cover" }} />
          </a>
        </div>

        {/* Settings */}
        <div className="icon">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4756ffd96725539dea28c8b7abddfec5db88e4aed5cfb92466e9daeadd59a135?"
            alt="setting"
          />
        </div>
      </div>
    </div>
  );
}

export default SidebarSimple;
