import React from "react";
import "./Profile.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import ProfileDetail from "../../components/ProfileDetail/ProfileDetail";
import GridPost from "../../components/GridPost/GridPost";
import Grid from "@mui/material/Grid";

function Profile() {
  return (
    <div id="main">
      <Grid container spacing={0}>
        <Grid item xs={3}>
          <SidebarLeft />
        </Grid>
        <Grid item xs={8}>
          <ProfileDetail />
          <GridPost />
        </Grid>
      </Grid>

      {/* Footer */}
      <div id="footer"></div>
    </div>
  );
}

export default Profile;
