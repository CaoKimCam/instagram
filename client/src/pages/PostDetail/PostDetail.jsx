import React, { useEffect, useState, useCallback } from "react";
import "./style.css";
import SidebarLeft from "../../components/SidebarLeft/SidebarLeft";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { getPostDetail } from "../../api/posterApi";
import userApi from "../../api/userApi";
import { deletePost } from "../../api/posterApi";
import EditPost from "../../components/EditPost/EditPost";
import commentApi from "../../api/commentApi";
import reactApi from "../../api/reactApi";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function PostDetail() {
    const { postId } = useParams();
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState("");
    const [userName, setUserName] = useState("");
    const [postTime, setPostTime] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [showEditPost, setShowEditPost] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [liked, setLiked] = useState(false);
    const [reactIds, setReactIds] = useState([]);
    const [likesCount, setLikesCount] = useState(0);

    const fetchComments = useCallback(async () => {
        try {
            const response = await commentApi.getAllComments(postId);
            const filteredComments = response.data.filter(comment => comment.postId === postId);
            const updatedComments = await Promise.all(
                filteredComments.map(async (comment) => {
                    const authorDetail = await userApi.getUserDetail(comment.authorId);
                    return {
                        ...comment,
                        authorName: authorDetail.data.userName,
                    };
                })
            );
            setComments(updatedComments);
        } catch (error) {
            console.error(`Error fetching comments for post ${postId}:`, error);
        }
    }, [postId]);

    const fetchReactStatus = useCallback(async () => {
        try {
            // Fetch thông tin user hiện tại
            const accountResponse = await userApi.account();
            const currentUserId = accountResponse.data.id; // Hoặc key khác nếu id không đúng
    
            // Fetch reacts
            const reacts = await reactApi.getAllReacts();
            if (reacts && Array.isArray(reacts)) {
                const filteredReacts = reacts.filter(react => react.objectId === postId);
                const userReact = filteredReacts.find(react => react.author === currentUserId);
                setReactIds(filteredReacts.map(react => react._id));
                setLikesCount(filteredReacts.length);
                if (userReact) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
            } else {
                console.error("Invalid reacts data:", reacts);
            }
        } catch (error) {
            console.error("Error fetching react status:", error);
        }
    }, [postId]);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await getPostDetail(postId);
                setPostContent(response.post.postContent);
                setPostImage(response.post.postImg);
                setPostTime(response.post.postTime);
                const authorId = response.post.authorId;
                if (authorId) {
                    const userDetailResponse = await userApi.getUserDetail(authorId);
                    setUserName(userDetailResponse.data.userName);
                }
                await fetchComments(); // Fetch danh sách comment khi load bài đăng
                await fetchReactStatus(); // Fetch số lượt like khi load bài đăng
            } catch (error) {
                console.error(`Error fetching post with ID ${postId}:`, error);
            }
        };

        fetchPostDetail();
    }, [postId, fetchComments, fetchReactStatus]);

    // Function để gửi comment mới lên server
    const handlePostComment = async () => {
        try {
            const commentDto = {
                content: newComment,
                postId: postId,
                time: new Date().toISOString(), // Thêm thời gian khi gửi comment
            };
            await commentApi.createComment(commentDto);
            setNewComment("");
            await fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
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

    const handleLike = async () => {
        try {
            const accountResponse = await userApi.account();
            const currentUserId = accountResponse.data.id;
    
            if (!liked) {
                if (currentUserId) {
                    const payload = { type: true, objectId: postId, author: currentUserId, time: new Date().toISOString() };
                    const newReact = await reactApi.createReact(payload);
                    setLiked(true);
                    setReactIds([...reactIds, newReact._id]);
                    setLikesCount(likesCount + 1);
                } else {
                    alert("User information not available");
                }
            } else {
                const userReact = await reactApi.getAllReacts();
                const reactToDelete = userReact.find(react => react.objectId === postId && react.author === currentUserId);
                if (reactToDelete) {
                    await reactApi.deleteReact(reactToDelete.id);
                    setLiked(false);
                    setReactIds(reactIds.filter(reactId => reactId !== reactToDelete._id));
                    setLikesCount(likesCount - 1);
                }
            }
        } catch (error) {
            console.error("Error liking or unliking post:", error);
            alert("Failed to like or unlike post");
        }
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
                                        style={{ marginLeft: "auto", transform: "translate(-20%,-15%)", cursor: "pointer" }}
                                        onClick={() => setShowOptions(!showOptions)}
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
                                {comments.map((comment) => (
                                    <div key={comment.id} style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                                        <div className="postDetailAvatar" style={{ alignSelf: "center" }}></div>
                                        <div style={{ display: "flex", flexDirection: "column", marginLeft: 10 }}>
                                            <div style={{ fontSize: 14, fontWeight: 500 }}>{comment.authorName}</div>
                                            <p style={{ fontWeight: 400, fontSize: 14 }}>{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phần tương tác bài đăng + caption */}
                            <div className="postDetail-footer">
                                <div className="postDetail-react">
                                    {liked ? (
                                        <FavoriteIcon
                                            style={{ cursor: "pointer", color: "red", width: 35, height: 35 }}
                                            onClick={handleLike}
                                            className="heart"
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            style={{ cursor: "pointer", width: 35, height: 35 }}
                                            onClick={handleLike}
                                            className="heart"
                                        />
                                    )}
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
                                    {likesCount} likes
                                </h4>

                                <p style={{ marginLeft: 20, color: "#737373", fontWeight: 400, fontSize: 12, marginTop: 5 }}>{calculatePostTime(postTime)}</p>

                                <div style={{ width: 335, display: "flex", flexDirection: "row", position: "absolute", bottom: 0, padding: "0 10px", borderTop: "1px solid #ccc" }}>
                                    <input
                                        type="text"
                                        className="typeComment"
                                        name="comment"
                                        placeholder="Add a comment..."
                                        style={{ border: "none", width: 300, padding: "15px 5px", outline: "none" }}
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                    />
                                    <button
                                        className="postCommentButton"
                                        style={{ color: "#4192EF", alignSelf: "center", border: "none", backgroundColor: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer" }}
                                        onClick={handlePostComment}
                                        disabled={!newComment}
                                    >
                                        Post
                                    </button>
                                </div>
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
