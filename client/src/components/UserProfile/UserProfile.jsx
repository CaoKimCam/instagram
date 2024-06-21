import React from "react";
import "./style.css";

function UserDetail({ user }) {
  // const { userName, bio, posts, followers, following, avatar } = user;
  const { userName } = user;

  return (
    <div style={{ backgroundColor: "#fefefe" }}>
      <div id="profile">
        <div style={{ display: "flex", flexDirection: "row" }}>

          {/* Avatar */}
          <div
            className="profileAvt"
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ccc",
              borderRadius: "100%",
              marginTop: 30,
              // backgroundImage: `url(${avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            
            {/* Tên người dùng, nút chỉnh sửa profile, nút đăng xuất */}
            <div className="row1">
              <h1 className="profileUsername">{userName}</h1>
            </div>

            {/* Số lượng bài đã đăng, người theo dõi, đang theo dõi */}
            <div className="row2">
              <p className="posts"><span style={{ fontWeight: 500 }}>3</span> posts</p>
              <p className="followers"><span style={{ fontWeight: 500 }}>3</span> followers</p>
              <p className="following"><span style={{ fontWeight: 500 }}>3</span> following</p>
            </div>
            
            {/* Phần mô tả */}
            <p className="profileBio">bio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
