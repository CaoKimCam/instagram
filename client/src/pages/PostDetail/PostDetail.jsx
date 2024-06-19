import React from "react";
import "./style.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Grid from "@mui/material/Grid";

function PostDetail() {
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

                        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                            {/* Phần caption của bài đăng */}
                            <div style={{ display: "flex", flexDirection: "column", height: "fit-content", width: 335, borderBottom: "1px solid #ccc" }}>
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

                            {/* Phần comment của bài đăng */}
                            <div style={{ display: "flex", flexDirection: "column", width: 335 }}>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                    <div className="postDetailAvatar" style={{ alignSelf: "center" }}></div>
                                    <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                                        <div style={{ fontSize: 14, fontWeight: 500 }}>userName</div>
                                        <p
                                            style={{ fontWeight: 400, fontSize: 14 }}
                                        >
                                            comment
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Phần tương tác bài đăng + caption */}
                            <div className="post-footer">
                                <div className="react">
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c20b1aa752aac82cf2696a44bc6f6310431162eefd7c1dd70943e77371996f53?"
                                        alt=""
                                        className="heart"
                                    />
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/39902428d2ced9abf70943cbb60eda5b8b45e004592c552b0bb4278608e4ffdc?"
                                        alt=""
                                        className="comment"
                                    />
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4738f086753c9eef15575e1ec80d909b8eeba168c98e0bd6d6fe0cd7b4c39c11?"
                                        alt=""
                                        className="share"
                                    />
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/539cd64323766987e541a1d54bd900af9f86b80385a6480427ab4d25919c095b?"
                                        alt=""
                                        className="save"
                                    />
                                </div>

                                <h4 className="number-like" style={{ fontWeight: 600, marginLeft: 20 }}>
                                    5 likes
                                </h4>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

            {/* Footer */}
            <div id="footer"></div>
        </div>
    );
}

export default PostDetail;
