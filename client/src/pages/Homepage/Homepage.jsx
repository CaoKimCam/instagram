import React, { useState, useEffect } from "react";
import "./Homepage.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Post from "../../components/Post/Post";
import Grid from "@mui/material/Grid";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import SidebarSimple from "../../components/SidebarSimple/SidebarSimple";
import SearchBox from "../../components/SearchBox/SearchBox";
import userApi from "../../api/userApi";
import { getAllPosts } from "../../api/posterApi";

function Homepage() {
  const [showSidebarLeft, setShowSidebarLeft] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [userName, setUserName] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAccount();
    fetchPosts();
  }, []);

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getAllPosts();
      if (Array.isArray(fetchedPosts)) {
        setPosts(fetchedPosts.reverse());
        console.log("Posts fetched:", fetchedPosts);
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
        setPosts(fetchedPosts.reverse());
        console.log("Homepage refreshed:", fetchedPosts);
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
    // Implement your time calculation logic here
  };

  return (
    <div id="main">
      <Grid container spacing={10}>
        <Grid item xs={3.5}>
          {showSidebarLeft ? (
            <SidebarLeft
              toggleSidebar={toggleSidebar}
              toggleSearchBox={toggleSearchBox}
              refreshHomepage={refreshHomepage}
            />
          ) : (
            <SidebarSimple
              toggleSidebar={toggleSidebar}
              toggleSearchBox={toggleSearchBox}
            />
          )}
          {showSearchBox && <SearchBox onSearch={handleSearch} />}
        </Grid>

        <Grid item xs={5}>
          {posts.map((post, index) => (
            <Post
              key={post.postId || index}
              post={post}
              calculatePostTime={calculatePostTime}
              refreshHomepage={refreshHomepage} // Truyền hàm refreshHomepage xuống Post component
            />
          ))}
        </Grid>

        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>

      <div id="footer"></div>
    </div>
  );
}

export default Homepage;
