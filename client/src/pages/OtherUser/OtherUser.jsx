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
        const userData = response.data;
        setUser(userData);

        // Lấy giá trị isFollowing từ localStorage
        const storedIsFollowing = localStorage.getItem('isFollowing_' + userId);
        setIsFollowing(storedIsFollowing === 'true');

        console.log("Fetched user data:", userData);
        console.log("isFollowing from localStorage:", storedIsFollowing);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

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

    fetchUserDetail();
    fetchPublicPosts();
  }, [user]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await userApi.followUser(userId);
        localStorage.setItem('isFollowing_' + userId, 'true');
        setIsFollowing(true); // Cập nhật state sau khi follow thành công
      } else {
        await userApi.unfollowByFollowing(userId);
        localStorage.removeItem('isFollowing_' + userId);
        setIsFollowing(false); // Cập nhật state sau khi unfollow thành công
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };
  
  useEffect(() => {
    const isUserFollowing = localStorage.getItem('isFollowing_' + userId) === 'true';
    setIsFollowing(isUserFollowing);
  }, [userId]);
  

  const handleAcceptFollow = async () => {
    try {
      await userApi.acceptFollow(userId);
    } catch (error) {
      console.error("Error accepting follow:", error);
    }
  };

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
                handleAcceptFollow={handleAcceptFollow}
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
