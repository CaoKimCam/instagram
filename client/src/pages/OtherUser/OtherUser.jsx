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
  const [isFriend, setIsFriend] = useState(false); // Trạng thái bạn bè
  const { id: userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await userApi.getUserDetail(userId);
        setUser(userResponse.data);
  
        const publicPosts = await getPublicPost(userResponse.data.userName);
        setPosts(publicPosts);
  
        const friendResponse = await userApi.isFriend(userResponse.data.userName);
        setIsFriend(friendResponse.data);
  
        const isUserFollowing = localStorage.getItem('isFollowing_' + userId) === 'true';
        setIsFollowing(isUserFollowing);
      } catch (error) {
        console.error("Error fetching user details or posts:", error);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await userApi.acceptFollow(userId);
        localStorage.setItem('isFollowing_' + userId, 'true');
        setIsFollowing(true);
      } else {
        await userApi.unfollowUser(userId);
        localStorage.removeItem('isFollowing_' + userId);
        setIsFollowing(false);
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
                isFriend={isFriend} // Truyền trạng thái bạn bè vào UserProfile
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
