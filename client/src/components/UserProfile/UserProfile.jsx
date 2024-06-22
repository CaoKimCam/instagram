import React, { useState } from "react";
import "./style.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function UserProfile({ user, handleFollowClick, isFollowing }) {
  const { userName } = user;
  const [isFavorite, setIsFavorite] = useState(false);

  const handleStarClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

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
              <div style={{ display: "flex", alignItems: "center" }}>
                <button className="userDetail-follow" onClick={handleFollowClick} style={{ marginRight: 10 }}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <div onClick={handleStarClick} style={{ cursor: 'pointer', margin: "20px 10px 0 10px" }}>
                  {isFavorite ? <StarIcon style={{ color: 'gold' }} /> : <StarBorderIcon />}
                </div>
              </div>
            </div>
            <div className="userDetail-row2">
              <p className="userDetail-posts">
                <span style={{ fontWeight: 500 }}>3</span> posts
              </p>
              <p className="userDetail-followers">
                <span style={{ fontWeight: 500 }}>3</span> followers
              </p>
              <p className="userDetail-following">
                <span style={{ fontWeight: 500 }}>3</span> following
              </p>
            </div>
            <p className="userDetail-profileBio">bio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
