import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./style.css";
import userApi from "../../api/userApi";

function SidebarRight() {
  // const [suggestedUsers, setSuggestedUsers] = useState([]);

  // Fake api danh sách gợi ý kết bạn
  // useEffect(() => {
  //   const fetchSuggestedUsers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://661b85d965444945d04fa64d.mockapi.io/users"
  //       );
  //       setSuggestedUsers(response.data);
  //       console.log("Suggested Users:", response.data);
  //     } catch (error) {
  //       console.error("Error fetching suggested users:", error);
  //     }
  //   };

  //   fetchSuggestedUsers();
  // }, []);

  const [userName, setUserName] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);

  useEffect(() => {
    fetchAccount();
  }, []);

  // Lấy dữ liệu tài khoản đăng nhập từ API
  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      setCurrentUserAvatar(response.data.userAvatar);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  return (
    <div id="sidebarRight" style={{ position: "relative" }}>
      {/* Profile */}
      <div className="profile">
        <img
          src={currentUserAvatar}
          alt=""
          className="avt"
          style={{ width: 50, height: 50, background: "#D9D9D9", borderRadius: 100, zIndex: -1, objectFit: "cover" }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto 0",
            transform: "translateY(-5%)",
          }}
        >
          <a href="./profile" style={{ textDecoration: "none", color: "#000", cursor: "pointer" }}>
            <p className="userName">
              {userName}
            </p>
          </a>
        </div>
      </div>

      {/* Suggested for you */}
      {/* <h2 style={{ marginLeft: 50 }}>Suggested for you</h2>

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
            <img src={user.avt} alt="" className="suggestedAvt" style={{ width: 50, height: 50, borderRadius: 100, zIndex: -1, }} />
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
      </div> */}
    </div >
  );
}

export default SidebarRight;
