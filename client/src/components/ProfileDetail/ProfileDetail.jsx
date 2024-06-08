import React from "react";
import "./style.css";

function ProfileDetail() {
  return (
    <div style={{ backgroundColor: "#fefefe" }}>
      <div id="profile">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div
            className="profileAvt"
            style={{
              width: 150,
              height: 150,
              backgroundColor: "#ccc",
              borderRadius: "100%",
              marginTop: 30,
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="row1">
              <h1 className="profileUsername">username</h1>
              <button className="editProfile">Edit profile</button>
              <button className="logout">Log out</button>
            </div>

            <div className="row2">
              <p className="posts"><span style={{ fontWeight: 500 }}>3</span> posts</p>
              <p className="followers"><span style={{ fontWeight: 500 }}>38</span> followers</p>
              <p className="following"><span style={{ fontWeight: 500 }}>63</span> following</p>
            </div>
            <p className="profileFullName">Full Name</p>
            <p className="profileBio">~Bio~</p>
          </div>
        </div>
      </div>

      <div id="gridPost"></div>
    </div>
  );
}

export default ProfileDetail;
