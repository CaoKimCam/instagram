import React, { useState, useEffect } from "react";
import "./Homepage.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import SidebarSimple from "../../components/SidebarSimple/SidebarSimple";
import Grid from "@mui/material/Grid";
import Post from "../../components/Post/Post";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import SearchBox from "../../components/SearchBox/SearchBox";
import CreatePost from "../../components/CreatePost/CreatePost";
import userApi from "../../api/userApi";
import { getAllPosts } from "../../api/posterApi";

function Homepage() {
  const [showSidebarLeft, setShowSidebarLeft] = useState(window.innerWidth > 1024);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setShowSidebarLeft(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchPosts();
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setCurrentUserId(response.data.id);
      setCurrentUserAvatar(response.data.userAvatar);
    } catch (error) {
      console.error("Error fetching user account data:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      if (Array.isArray(fetchedPosts)) {
        const posts = fetchedPosts.flat();
        const postsWithUserDetails = await Promise.all(posts.map(async post => {
          try {
            const userResponse = await userApi.getUserDetail(post.authorId);
            return {
              ...post,
              username: userResponse.data.userName,
              authorAvatar: userResponse.data.userAvatar,
            };
          } catch (error) {
            console.error(`Error fetching user details for authorId ${post.authorId}:`, error);
            return post;
          }
        }));
        setPosts(postsWithUserDetails.reverse());
      } else {
        console.error("Invalid posts data:", fetchedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const refreshHomepage = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      if (Array.isArray(fetchedPosts)) {
        const posts = fetchedPosts.flat();
        const postsWithUserDetails = await Promise.all(posts.map(async post => {
          try {
            const userResponse = await userApi.getUserDetail(post.authorId);
            return {
              ...post,
              username: userResponse.data.userName,
              authorAvatar: userResponse.data.userAvatar,
            };
          } catch (error) {
            console.error(`Error fetching user details for authorId ${post.authorId}:`, error);
            return post;
          }
        }));
        setPosts(postsWithUserDetails.reverse());
        console.log("Homepage refreshed:", postsWithUserDetails);
      } else {
        console.error("Invalid posts data:", fetchedPosts);
      }
    } catch (error) {
      console.error("Error refreshing homepage:", error);
    }
  };

  const toggleSidebar = () => {
    setShowSidebarLeft(!showSidebarLeft);
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox);
  };

  const openCreatePost = () => {
    setShowCreatePost(true);
    setShowSearchBox(false);
  };

  const closeCreatePost = () => {
    setShowCreatePost(false);
  };

  const handleSearch = async (name) => {
    try {
      const response = await userApi.searchUserByName(name);
      return response.data;
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };

  const calculatePostTime = (postTime) => {
    const currentTime = new Date().getTime();
    const postTimeInMs = new Date(postTime).getTime();
    const diffInMs = currentTime - postTimeInMs;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        return `${diffInMinutes} minutes ago`;
      } else {
        return `${diffInHours} hours ago`;
      }
    } else if (diffInHours >= 24 && diffInHours < 48) {
      return "yesterday";
    } else {
      const postDate = new Date(postTime);
      return postDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
  };

  return (
    <div id="main">
      <Grid container spacing={10}>
        <Grid item xs={12} md={3.5}>
          {showSidebarLeft ? (
            <SidebarLeft
              toggleSidebar={toggleSidebar}
              toggleSearchBox={toggleSearchBox}
              openCreatePost={openCreatePost}
              userAvatar={currentUserAvatar}
            />
          ) : (
            <SidebarSimple
              toggleSidebar={toggleSidebar}
              toggleSearchBox={toggleSearchBox}
              userAvatar={currentUserAvatar}
              openCreatePost={openCreatePost}
            />
          )}
          {showSearchBox && <SearchBox onSearch={handleSearch} />}
        </Grid>

        <Grid item xs={12} md={5}>
          {posts.length === 0 ? (
            <p style={{ marginTop: 30 }}>No posts available. Follow your friends to see new posts.</p>
          ) : (
            posts.map((post, index) => (
              <Post
                key={post.postId || index}
                post={post}
                calculatePostTime={calculatePostTime}
                refreshHomepage={refreshHomepage}
                currentUserId={currentUserId}
                authorAvatar={post.authorAvatar}
              />
            ))
          )}
        </Grid>

        <Grid item xs={12} md={3} className="sidebarRight">
          <SidebarRight />
        </Grid>
      </Grid>

      <div id="footer"></div>

      {showCreatePost && (
        <CreatePost onClose={closeCreatePost} refreshHomepage={refreshHomepage} />
      )}
    </div>
  );
}

export default Homepage;
