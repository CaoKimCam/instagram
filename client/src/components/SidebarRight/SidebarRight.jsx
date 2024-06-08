import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function SidebarRight() {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const response = await axios.get(
          "https://661b85d965444945d04fa64d.mockapi.io/users"
        );
        setSuggestedUsers(response.data);
        console.log("Suggested Users:", response.data);
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      }
    };

    fetchSuggestedUsers();
  }, []);

  return (
    <div style={{position: "relative", zIndex: -1 }}>
      {/* Profile */}
      <div className="profile">
        <a href="/profile">
          <div
            className="avt"
            style={{
              width: 50,
              height: 50,
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
          <p className="sidebar-fullName">HNBC</p>
        </div>
      </div>

      {/* Suggested for you */}
      <h2>Suggested for you</h2>

      <div
        className="wrapped"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {suggestedUsers.map((user) => (
          <div
            className="suggestedUser"
            style={{ display: "flex", flexDirection: "row", marginBottom: 10 }}
            key={user.id}
          >
            <img src={user.avt} alt="" className="suggestedAvt" style={{ width: 50, height: 50, borderRadius: 100 }} />
            <p
              className="suggestedName"
              style={{
                display: "flex",
                marginTop: "auto",
                marginBottom: "auto",
                transform: "translateY(-10%)",
              }}
            >
              {user.username}
            </p>
            <button className="follow">Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SidebarRight;
