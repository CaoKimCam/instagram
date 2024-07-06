import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OtherUser.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import UserProfile from "../../components/UserProfile/UserProfile";
import GridPost from "../../components/GridPost/GridPost";
import Grid from "@mui/material/Grid";
import userApi from "../../api/userApi";
import { getPostFromOther } from "../../api/posterApi";

function OtherUser() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
  const [currentUserBestFriends, setCurrentUserBestFriends] = useState([]);
  const { id: userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy thông tin người dùng đang hiển thị
        const userResponse = await userApi.getUserDetail(userId);
        setUser(userResponse.data);

        // Lấy danh sách public posts của người dùng
        const publicPosts = await getPostFromOther(userResponse.data.userName);
        const formattedPosts = publicPosts.flat().map(post => ({
          ...post,
          image: post.postImg
        }));
        setPosts(formattedPosts);

        // Lấy danh sách following của tài khoản đang đăng nhập
        const currentUser = await userApi.account();
        const followingList = currentUser.data.followings || [];
        setCurrentUserFollowing(followingList.map(id => id.toString()));

        // Lấy danh sách bạn thân của tài khoản đang đăng nhập
        const bestFriendsList = currentUser.data.bestfriend || [];
        setCurrentUserBestFriends(bestFriendsList.map(id => id.toString()));

        // Kiểm tra xem người dùng hiện tại đã theo dõi người dùng khác chưa
        setIsFollowing(followingList.includes(userId));

        // Kiểm tra xem người dùng hiện tại có là bạn thân của người dùng khác không
        setIsFavorite(bestFriendsList.includes(userId));

        // Kiểm tra xem người dùng hiện tại có là bạn của người dùng khác không
        const checkIsFriend = await userApi.isFriend(userResponse.data.userName);
        setIsFriend(checkIsFriend.data);

      } catch (error) {
        console.error("Error fetching user details or posts:", error);
      }
    };

    fetchData();
  }, [userId, currentUserFollowing, currentUserBestFriends]);

  const handleFollowClick = async () => {
    try {
      if (!isFollowing) {
        await userApi.acceptFollow(userId);
        setIsFollowing(true);
      } else {
        await userApi.unfollowUser(userId);
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };

  const handleStarClick = async () => {
    try {
      if (!isFavorite) {
        await userApi.addBestfriend(user.userName);
        setIsFavorite(true);
      } else {
        await userApi.removeBestfriend(user.userName);
        setIsFavorite(false);
      }
    } catch (error) {
      console.error("Error adding/removing best friend:", error);
    }
  };

  const handleClick = (postId) => {
    console.log(postId);
    navigate(`/post-detail/${postId}`);
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
                isFriend={isFriend}
                handleStarClick={handleStarClick}
                isFavorite={isFavorite}
              />
              <GridPost posts={posts} handleClick={handleClick} />
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
