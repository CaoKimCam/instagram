import React, { useState, useEffect } from "react";
import "./Homepage.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Post from "../../components/Post/Post";
import Grid from "@mui/material/Grid";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import SidebarSimple from "../../components/SidebarSimple/SidebarSimple";
import SearchBox from "../../components/SearchBox/SearchBox";
import { getPosts } from "../../api/posterApi";

function Homepage() {
  const [data, setData] = useState(null);
  const [showSidebarLeft, setShowSidebarLeft] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(false);
  
  useEffect(() => {
    fetchData();
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
