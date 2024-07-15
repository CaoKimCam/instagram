import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

function ProfileDetail({ userName, followers, followings, postsCount, userAvatar, userBio }) {
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div id="profile">
      <div className="profileWrap" style={{ display: "flex", flexDirection: "row", position: "relative" }}>

        {/* Avatar */}
        <img
          src={userAvatar}
          alt=""
          className="profileAvt"
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#ccc",
            borderRadius: "100%",
            marginTop: 30,
            objectFit: "cover"
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>

          {/* Tên người dùng, nút chỉnh sửa profile, nút đăng xuất */}
          <div className="row1">
            <h1 className="profileUsername">{userName}</h1>
          </div>

          {/* Số lượng bài đã đăng, người theo dõi, đang theo dõi */}
          <div className="row2">
            <p className="posts"><span style={{ fontWeight: 500 }}>{postsCount}</span> posts</p>
            <p className="followers"><span style={{ fontWeight: 500 }}>{followers}</span> followers</p>
            <p className="following"><span style={{ fontWeight: 500 }}>{followings}</span> followings</p>
          </div>

          {/* Phần mô tả */}
          <p className="profileBio">{userBio}</p>
        </div>

        <div style={{ display: "flex", flexDirection: "row" }}>
          <a href="./edit-profile"><button className="editProfile" style={{ margin: "20px 10px 0 0" }}>Edit profile</button></a>
          <button className="logout" style={{ margin: "20px 0 0 0" }} onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
