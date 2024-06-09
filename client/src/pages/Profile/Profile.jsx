import React, { useState, useEffect } from "react";
import "./Profile.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import ProfileDetail from "../../components/ProfileDetail/ProfileDetail";
import GridPost from "../../components/GridPost/GridPost";
import Grid from "@mui/material/Grid";
import { getPosts } from "../../api/posterApi";
import userApi from "../../api/userApi";

function Profile() {
  const [data, setData] = useState(null);
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

  return (
    <div id="main">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={8}>

          {/* Profile Detail */}
          {data && (
            <ProfileDetail
              userName={userName}
            />
          )}

          {/* Grid Post */}
          {data && (
            <GridPost images={data.map(post => post.postImg)} />
          )}
        </Grid>
      </Grid>

      {/* Footer */}
      <div id="footer"></div>
    </div>
  );
}

export default Profile;
