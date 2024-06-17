import React from "react";
import "./style.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Grid from "@mui/material/Grid";

function Profile() {
    return (
        <div id="main">
            <Grid container spacing={30}>

                {/* Sidebar bên trái */}
                <Grid item xs={3}>
                    <SidebarLeft />
                </Grid>

                {/* Phần Content */}
                <Grid item xs={9}>
                    <div id="postDetailContent">

                        {/* Ảnh của bài đăng */}
                        <img
                            id="postDetailImage"
                            src="https://via.placeholder.com/600"
                            alt=""
                            className="postDetailImage"
                        />

                        {/* Thông tin khác của bài đăng */}
                        <div style={{ display: "flex", flexDirection: "column", height: "fit-content", width: 335, borderBottom: "0.5px solid #ccc" }}>
                            <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                <div className="postDetailAvatar"></div>
                                <div className="postDetailUsername">userName</div>
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/074e65548a4a3086d9bf392b7f72cda993c6880767874d394d37e12ed2bcc99b?"
                                    alt=""
                                    style={{ marginLeft: "auto", transform: "translate(-20%,-15%)" }}
                                />
                            </div>
                            <p
                                id="postDetailCaption"
                                style={{ marginLeft: 20, width: 300, fontWeight: 400, fontSize: 14, marginBottom: 20 }}
                            >
                                postContent
                            </p>
                        </div>
                        
                    </div>
                </Grid>
            </Grid>

            {/* Footer */}
            <div id="footer"></div>
        </div>
    );
}

export default Profile;
