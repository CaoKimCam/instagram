import React, { useState, useEffect } from "react";
import "./Profile.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import ProfileDetail from "../../components/ProfileDetail/ProfileDetail";
import GridPost from "../../components/GridPost/GridPost";
import Grid from "@mui/material/Grid";
import { getMyPosts } from "../../api/posterApi";
import userApi from "../../api/userApi";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);
  const [userBio, setUserBio] = useState(null);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    fetchAccount();
  }, []);

  const handleClick = (postId) => {
    console.log(postId);
    navigate(`/post-detail/${postId}`);
  };

  const fetchData = async () => {
    try {
      const posts = await getMyPosts();
      setData(posts.reverse());
      setPostsCount(posts.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      setUserBio(response.data.userBio);
      setCurrentUserAvatar(response.data.userAvatar);
      setFollowers(response.data.followers.length);
      setFollowings(response.data.followings.length);
    } catch (error) {
      console.error("Error fetching user account data:", error);
    }
  };

  return (
    <div id="main">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={8}>
          {data && (
            <ProfileDetail
              userName={userName}
              userAvatar={currentUserAvatar}
              userBio={userBio}
              followers={followers}
              followings={followings}
              postsCount={postsCount}
            />
          )}
          {data && (
            <GridPost
              posts={data.map(post => ({
                image: post.postImg,
                postId: post.postId
              }))}
              handleClick={handleClick}
            />
          )}
        </Grid>
      </Grid>
      <div id="footer"></div>
    </div>
  );
}

export default Profile;
