import React, { useState, useEffect } from "react";
import "./Homepage.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Post from "../../components/Post/Post";
import Grid from "@mui/material/Grid";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import SidebarSimple from "../../components/SidebarSimple/SidebarSimple";
import SearchBox from "../../components/SearchBox/SearchBox";
import { getPosts } from "../../api/posterApi";
import userApi from "../../api/userApi";

function Homepage() {
  const [data, setData] = useState(null);
  const [showSidebarLeft, setShowSidebarLeft] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    fetchData();
    fetchAccount();
  }, []);

  const fetchData = async () => {
    try {
      const posts = await getPosts();
      setData(posts.reverse());
      console.log("Data from API:", posts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAccount = async () => {
    try {
      const response = await userApi.account();
      setUserName(response.data.userName);
      console.log("UserName from API:", response.data.userName);
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const refreshHomepage = async () => {
    try {
      const posts = await getPosts();
      setData(posts.reverse());
      console.log("Homepage refreshed:", posts);
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
        <Grid item xs={3.5}>
          {showSidebarLeft ? (
            <SidebarLeft toggleSidebar={toggleSidebar} toggleSearchBox={toggleSearchBox} refreshHomepage={refreshHomepage} />
          ) : (
            <SidebarSimple toggleSidebar={toggleSidebar} toggleSearchBox={toggleSearchBox} />
          )}
          {showSearchBox && <SearchBox />}
        </Grid>
        <Grid item xs={5}>
          {data &&
            data.map((post) => (
              <Post
                key={post.postId}
                image={post.postImg}
                caption={post.postContent}
                postTime={calculatePostTime(post.postTime)}
                userName={userName}
              />
            ))}
        </Grid>
        <Grid item xs={3}>
          <SidebarRight />
        </Grid>
      </Grid>

      {/* Footer */}
      <div id="footer"></div>
    </div>
  );
}

export default Homepage;
