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
  const [isFollowing, setIsFollowing] = useState(false);
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
          console.log("Fetched public posts:", publicPosts);
        }
      } catch (error) {
        console.error("Error fetching public posts:", error);
      }
    };

    fetchUserDetail();
    fetchPublicPosts();
  }, [userId]); // useEffect sẽ chạy lại khi userId thay đổi

  useEffect(() => {
    const storedIsFollowing = localStorage.getItem('isFollowing_' + userId);
    if (storedIsFollowing !== null) {
      setIsFollowing(storedIsFollowing === 'true');
      console.log("isFollowing from localStorage:", storedIsFollowing);
    } else {
      setIsFollowing(false); // Nếu không có trong localStorage, set mặc định là false
    }
  }, [userId]); // useEffect này chỉ cần chạy lại khi userId thay đổi

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await userApi.acceptFollow(userId);
        setIsFollowing(true);
        localStorage.setItem('isFollowing_' + userId, 'true');
        console.log("Following:", userId);
      } else {
        await userApi.unfollowByFollowing(userId);
        setIsFollowing(false);
        localStorage.setItem('isFollowing_' + userId, 'false');
        console.log("Unfollowing:", userId);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
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
