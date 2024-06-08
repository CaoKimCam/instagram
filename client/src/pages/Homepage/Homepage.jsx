import React, { useState, useEffect } from "react";
import "./Homepage.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Post from "../../components/Post/Post";
import Grid from "@mui/material/Grid";
import axios from "axios";
import SidebarRight from "../../components/SidebarRight/SidebarRight";
import SidebarSimple from "../../components/SidebarSimple/SidebarSimple";
import SearchBox from "../../components/SearchBox/SearchBox";

function Homepage() {
  const [data, setData] = useState(null);
  const [showSidebarLeft, setShowSidebarLeft] = useState(true);
  const [showSearchBox, setShowSearchBox] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://661b85d965444945d04fa64d.mockapi.io/posts"
        );
        setData(response.data);
        console.log("Data from API:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setShowSidebarLeft(!showSidebarLeft); // Chuyển giữa hiển thị SidebarLeft và SidebarSimple khi nhấn nút Search
  };

  const toggleSearchBox = () => {
    setShowSearchBox(!showSearchBox); // Chuyển đổi trạng thái hiển thị của SearchBox
  };

  return (
    <div id="main">
      <Grid container spacing={10}>
        <Grid item xs={3.5}>
          {showSidebarLeft ? (
            <SidebarLeft toggleSidebar={toggleSidebar} toggleSearchBox={toggleSearchBox} />
          ) : (
            <SidebarSimple toggleSidebar={toggleSidebar} toggleSearchBox={toggleSearchBox} />
          )}
          {showSearchBox && <SearchBox />}
        </Grid>
        <Grid item xs={5}>
          {data &&
            data.map((post) => (
              <Post
                key={post.id}
                avatar={post.avatar}
                username={post.username}
                time={post.time}
                image={post.image}
                numberLike={post.numberLike}
                userComment={post.userComment}
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
