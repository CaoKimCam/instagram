import React, { useEffect } from "react";
import "./style.css";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

function UserProfile({ user, handleFollowClick, isFollowing, isFriend, handleStarClick, isFavorite }) {
  const { userName, followers, followings } = user;

  useEffect(() => {
    console.log("isFriend in UserProfile:", isFriend);
    console.log("isFollowing in UserProfile:", isFollowing);
    console.log("isFavorite in UserProfile:", isFavorite);
  }, [isFriend, isFollowing, isFavorite]); // Đảm bảo useEffect này nhận các giá trị mới của isFriend và isFollowing và isFavorite

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
              backgroundImage: `url(${user.avatarUrl || 'default-avatar-url'})`,
            }}
          ></div>
          <div style={{ display: "flex", flexDirection: "column", marginLeft: 20 }}>
            <div className="userDetail-row1">
              <h1 className="userDetail-profileUsername">{userName}</h1>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button className="userDetail-follow" onClick={handleFollowClick} style={{ marginRight: 10 }}>
                  {isFriend ? "Friend" : (isFollowing ? "Unfollow" : "Follow")}
                </button>
                <div onClick={handleStarClick} style={{ cursor: 'pointer', margin: "20px 10px 0 10px" }}>
                  {isFavorite ? <StarIcon style={{ color: 'gold' }} /> : <StarBorderIcon />}
                </div>
              </div>
            </div>
            <div className="userDetail-row2">
              <p className="userDetail-posts">
                <span style={{ fontWeight: 500 }}>{user.postIds.length}</span> posts
              </p>
              <p className="userDetail-followers">
                <span style={{ fontWeight: 500 }}>{followers.length}</span> followers
              </p>
              <p className="userDetail-following">
                <span style={{ fontWeight: 500 }}>{followings.length}</span> following
              </p>
            </div>
            <p className="userDetail-profileBio">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
