import React from "react";
import "./style.css";

function UserDetail({ user, handleFollowClick, isFollowing }) {
  const { userName } = user;

  return (
    <div style={{ backgroundColor: "#fefefe" }}>
      <div id="userDetail-profile">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="userDetail-profileAvt"
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ccc",
              borderRadius: "100%",
              marginTop: 30,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <div className="userDetail-row1">
              <h1 className="userDetail-profileUsername">{userName}</h1>
              <button className="userDetail-follow" onClick={handleFollowClick}>
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
            <div className="userDetail-row2">
              <p className="userDetail-posts">
                <span style={{ fontWeight: 500 }}>5</span> posts
              </p>
              <p className="userDetail-followers">
                <span style={{ fontWeight: 500 }}>5</span> followers
              </p>
              <p className="userDetail-following">
                <span style={{ fontWeight: 500 }}>5</span> following
              </p>
            </div>
            <p className="userDetail-profileBio">gdsgasfdas</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
