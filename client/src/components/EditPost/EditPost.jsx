import React, { useState, useEffect } from "react";
import "./style.css";
import userApi from "../../api/userApi";
import { getPostDetail, updatePost } from "../../api/posterApi";

function EditPost({ postId, initialContent, onClose, onEditComplete }) {
  const [postContent, setPostContent] = useState(initialContent);
  const [userName, setUserName] = useState("");
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    fetchAccount();
    fetchPostDetail(postId);
  }, [postId]);

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

  // Lấy dữ liệu một bài viết cụ thể từ API
  const fetchPostDetail = async (postId) => {
    try {
      const response = await getPostDetail(postId);
      setPostContent(response.post.postContent);
      setPostImage(response.post.postImg);
    } catch (error) {
      console.error(`Error fetching post with ID ${postId}:`, error);
    }
  };

  // Hàm xử lý cập nhật bài đăng
  const handleUpdatePost = async () => {
    try {
      await updatePost(postId, postContent);
      alert('Post updated successfully');
      onClose();
      onEditComplete();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <div id="editPost">

          {/* Header */}
          <div className="header">
            <div
              id="editPost"
              className="editPost"
              style={{
                display: "flex",
                marginRight: "auto",
                marginLeft: 30,
                color: "#0095F6",
                cursor: "pointer"
              }}
              onClick={onClose}
            >
              Exit
            </div>

            <div style={{ margin: "auto" }}>
              Edit post
            </div>

            <div
              id="editPost"
              className="editPost"
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: 30,
                color: "#0095F6",
                cursor: "pointer"
              }}
              onClick={handleUpdatePost}
            >
              Done
            </div>
          </div>

          {/* Content */}
          <div className="content">

            {/* Ảnh không thể thay đổi */}
            <div style={{ width: 476, borderRight: "1px solid #ccc", position: "relative" }}>
              <img
                id="editImage"
                src={postImage || "https://via.placeholder.com/476"}
                alt=""
                className="editImage"
              />
            </div>

            {/* Phần caption */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
                <div className="editAvatar"></div>
                <div className="editUsername">{userName}</div>
              </div>
              <textarea
                id="postContent"
                placeholder="Write a caption..."
                className="postContent"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
