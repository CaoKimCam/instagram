import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./OtherUser.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import UserProfile from "../../components/UserProfile/UserProfile";
import GridPost from "../../components/GridPost/GridPost";
import Grid from "@mui/material/Grid";
import userApi from "../../api/userApi";
import { getPublicPost } from "../../api/posterApi";

function OtherUser() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false); // Trạng thái theo dõi
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await userApi.getUserDetail(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetail();
  }, [userId]);

  useEffect(() => {
    const fetchPublicPosts = async () => {
      try {
        if (user) {
          const publicPosts = await getPublicPost(user.userName);
          setPosts(publicPosts);
        }
      } catch (error) {
        console.error("Error fetching public posts:", error);
      }
    };

    fetchPublicPosts();
  }, [user]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await userApi.acceptFollow(userId); // Use acceptFollow for following
        localStorage.setItem('isFollowing_' + userId, 'true');
        setIsFollowing(true); // Update state after successful follow
      } else {
        await userApi.unfollowUser(userId);
        localStorage.removeItem('isFollowing_' + userId);
        setIsFollowing(false); // Update state after successful unfollow
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  useEffect(() => {
    const isUserFollowing = localStorage.getItem('isFollowing_' + userId) === 'true';
    setIsFollowing(isUserFollowing);
  }, [userId]);

  return (
    <div id="main">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={8}>
          {user ? (
            <>
              <UserProfile
                user={user}
                handleFollowClick={handleFollowClick}
                isFollowing={isFollowing}
              />
              <GridPost posts={posts} />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
      </Grid>
      <div id="footer"></div>
    </div>
  );
}

export default OtherUser;
