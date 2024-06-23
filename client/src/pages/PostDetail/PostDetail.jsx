import React, { useEffect, useState } from "react";
import "./style.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../api/posterApi";
import userApi from "../../api/userApi";
import { deletePost } from "../../api/posterApi";
import EditPost from "../../components/EditPost/EditPost";

function PostDetail() {
    const { postId } = useParams();
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState("");
    const [userName, setUserName] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);

    useEffect(() => {
        fetchAccount();
    }, []);

    // Lấy dữ liệu tài khoản đăng nhập từ API
    const fetchAccount = async () => {
        try {
            const response = await userApi.account();
            setUserName(response.data.userName);
            console.log("UserName from API:", response.data.userName);
        } catch (error) {
            console.error("Error fetching user name:", error);
        }
    };

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await getPostDetail(postId);
                setPostContent(response.post.postContent);
                setPostImage(response.post.postImg);
            } catch (error) {
                console.error(`Error fetching post with ID ${postId}:`, error);
            }
        };

        fetchPostDetail();
    }, [postId]);

    // Hàm xử lý khi nhấn dấu ba chấm ở header
    const handleMoreClick = () => {
        setShowOptions(!showOptions);
    };

    // Hàm xử lý khi nhấn Delete
    const handleDelete = async () => {
        try {
            await deletePost(postId);
            alert("Post deleted successfully");
            setShowOptions(false);
            // refreshHomepage();
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
        }
    };

    // Hàm xử lý khi nhấn Edit
    const handleEdit = () => {
        setShowEditPost(true);
        setShowOptions(false);
    };

    // Hàm xử lý khi nhấn Copy Link
    const handleCopyLink = () => {
        const link = `${window.location.origin}/post-detail/${postId}`;
        navigator.clipboard.writeText(link)
            .then(() => {
                alert("Link copied to clipboard");
            })
            .catch((err) => {
                console.error("Error copying link:", err);
                alert("Failed to copy link");
            });
        setShowOptions(false);
    };

    // Hàm xử lý khi nhấn Cancel
    const handleCancel = () => {
        setShowOptions(false);
    };

    // Hàm xử lý để đóng EditPost component
    const handleCloseEditPost = () => {
        setShowEditPost(false);
    };

    // Hàm xử lý sau khi cập nhật bài đăng hoàn thành -> làm mới trang chủ
    const handleEditComplete = () => {
        setShowEditPost(false);
        // refreshHomepage();
    };

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
                            src={postImage || "https://via.placeholder.com/600"}
                            alt="Post Detail"
                            className="postDetailImage"
                        />

                        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                            {/* Phần caption của bài đăng */}
                            <div style={{ display: "flex", flexDirection: "column", height: "fit-content", width: 335, borderBottom: "1px solid #ccc" }}>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                    <div className="postDetailAvatar"></div>
                                    <div className="postDetailUsername">{userName}</div>
                                    <img
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/074e65548a4a3086d9bf392b7f72cda993c6880767874d394d37e12ed2bcc99b?"
                                        alt=""
                                        style={{ marginLeft: "auto", transform: "translate(-20%,-15%)", cursor: "pointer"}}
                                        onClick={handleMoreClick}
                                    />
                                    {/* Khi nhấn "more" sẽ hiển thị các lựa chọn: delete, edit, copy link */}
                                    {showOptions && (
                                        <div className="options-menu">
                                            <div className="option" style={{ color: "red" }} onClick={handleDelete}>
                                                Delete
                                            </div>
                                            <div className="option" onClick={handleEdit}>
                                                Edit
                                            </div>
                                            <div className="option" onClick={handleCopyLink}>
                                                Copy link
                                            </div>
                                            <div className="option" onClick={handleCancel}>
                                                Cancel
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p
                                    id="postDetailCaption"
                                    style={{ marginLeft: 20, width: 300, fontWeight: 400, fontSize: 14, marginBottom: 20 }}
                                >
                                    {postContent}
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
                            <div className="postDetail-footer">
                                <div className="postDetail-react">
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
            {/* Bật/tắt EditPost component */}
            {showEditPost && (
                <EditPost
                    postId={postId}
                    onClose={handleCloseEditPost}
                    onEditComplete={handleEditComplete}
                />
            )}
        </div>
    );
}

export default PostDetail;
